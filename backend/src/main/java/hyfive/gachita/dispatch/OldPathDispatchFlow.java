package hyfive.gachita.dispatch;

import hyfive.gachita.dispatch.dto.*;
import hyfive.gachita.dispatch.excepion.DispatchErrorCode;
import hyfive.gachita.dispatch.excepion.DispatchException;
import hyfive.gachita.dispatch.module.calculator.InsertNodeCalculator;
import hyfive.gachita.dispatch.module.condition.PathCondition;
import hyfive.gachita.dispatch.module.provider.OldPathListProvider;
import hyfive.gachita.dispatch.module.provider.SlotCandidateProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

@Slf4j
@Component
@RequiredArgsConstructor
public class OldPathDispatchFlow {

    private final SlotCandidateProvider slotCandidateProvider;
    private final InsertNodeCalculator insertNodeCalculator;
    private final OldPathListProvider oldPathListProvider;

    public DispatchResult execute(List<Long> pathIds, NewBookDto newBook) {
        log.info("========= [OldPathDispatchFlow] 기존 경로 배차 로직 시작 =========");
        log.info("입력된 초기 후보 Path ID 수: {}개, IDs: {}", pathIds.size(), pathIds);

        if (pathIds.isEmpty()) {
            throw new DispatchException(DispatchErrorCode.CANDIDATE_EMPTY, "배차 가능한 경로가 없습니다.");
        }

        AtomicInteger apiCallCounter = new AtomicInteger(0);
        List<FinalOldPathDto> finalPathCandidates = new ArrayList<>();

        // 1. DB에서 조건에 맞는 경로 후보 조회
        PathCondition condition = PathCondition.from(pathIds, newBook);
        log.info("condition: {}", condition);
        List<OldPathDto> pathCandidates = oldPathListProvider.getByCondition(condition);
        log.info("STEP 1: DB 조회 후 유효한 경로 후보 {}개 발견", pathCandidates.size());
        if (log.isDebugEnabled()) {
            List<Long> validPathIds = pathCandidates.stream().map(OldPathDto::pathId).toList();
            log.debug(" -> 유효 경로 후보 Path IDs: {}", validPathIds);
        }

        if (pathCandidates.isEmpty()) {
            throw new DispatchException(DispatchErrorCode.CANDIDATE_EMPTY, "유휴 시간을 만족하는 배차 가능한 경로가 없습니다.");
        }

        // 2. 각 경로 후보에 대해 신규 예약 노드를 삽입하는 모든 경우의 수 탐색
        for (OldPathDto pathCandidate : pathCandidates) {
            Long pathId = pathCandidate.pathId();
            Long carId = pathCandidate.carId();
            List<NodeDto> oldNodes = pathCandidate.nodes();
            log.info("--- Path ID: {} 처리 시작 (기존 노드: {}개) ---", pathId, oldNodes.size());

            NodeDto newBookStartNode = NodeDto.newBookStartNodeFrom(newBook);
            NodeDto newBookEndNode = NodeDto.newBookEndNodeFrom(newBook);

            // 2-1. 신규 예약의 출발/도착 노드를 삽입할 위치 후보 탐색
            List<Integer> startSlotCandidates = slotCandidateProvider.findSlotCandidates(oldNodes, newBookStartNode);
            List<Integer> endSlotCandidates = slotCandidateProvider.findSlotCandidates(oldNodes, newBookEndNode);
            log.info("STEP 2-1: 삽입 위치 탐색 결과 -> 시작점 후보: {}개, 도착점 후보: {}개", startSlotCandidates.size(), endSlotCandidates.size());
            log.debug(" -> 시작점 삽입 인덱스 후보: {}", startSlotCandidates);
            log.debug(" -> 도착점 삽입 인덱스 후보: {}", endSlotCandidates);

            if (startSlotCandidates.isEmpty() || endSlotCandidates.isEmpty()) {
                throw new DispatchException(DispatchErrorCode.CANDIDATE_EMPTY, "노드를 삽입할 슬롯 후보가 없습니다.");
            }

            // 2-2. 가능한 모든 삽입 위치 조합에 대해 경로 정보 업데이트 (완전 탐색)
            List<FinalOldPathDto> singlePathCandidates = new ArrayList<>();
            log.info("STEP 2-2: 모든 조합 완전 탐색 시작");
            for (Integer si : startSlotCandidates) {
                for (Integer ei : endSlotCandidates) {
                    if (si <= ei) {
                        log.info("후보 위치 : si: {}, ei: {}", si, ei+1);

                        List<NodeDto> candidatePath = new ArrayList<>(oldNodes);
                        candidatePath.add(ei, newBookEndNode);
                        candidatePath.add(si, newBookStartNode);

                        apiCallCounter.incrementAndGet();
                        UpdatedPathDto updatedPath = insertNodeCalculator.getUpdatedPath(candidatePath);

                        if (updatedPath != null) {
                            FinalOldPathDto finalOldPath = FinalOldPathDto.builder()
                                    .pathId(pathId)
                                    .carId(carId)
                                    .nodeList(updatedPath.updatedNodes())
                                    .totalDuration(updatedPath.routeInfo().totalDuration())
                                    .totalDistance(updatedPath.routeInfo().totalDistance())
                                    .build();
                            singlePathCandidates.add(finalOldPath);
                            log.debug("  -> [조합 성공] si: {}, ei: {}. 소요시간: {}초, 거리: {}m", si, ei, finalOldPath.totalDuration(), finalOldPath.totalDistance());
                        }
                    }
                }
            }

            // 2-3. 현재 Path ID 내에서 가장 효율적인 경로(Best Path) 1개 선정
            log.info("STEP 2-3: Path ID {}에 대한 최적 조합 탐색 (후보: {}개)", pathId, singlePathCandidates.size());
            Optional<FinalOldPathDto> bestSinglePathOpt = singlePathCandidates.stream()
                    .min(Comparator
                            .comparingInt(FinalOldPathDto::totalDuration)
                            .thenComparingInt(FinalOldPathDto::totalDistance));

            if (bestSinglePathOpt.isPresent()) {
                FinalOldPathDto bestSinglePath = bestSinglePathOpt.get();
                finalPathCandidates.add(bestSinglePath);
                log.info(" -> Path ID {}의 최적 조합 선택! (소요시간: {}초, 거리: {}m)", pathId, bestSinglePath.totalDuration(), bestSinglePath.totalDistance());
            } else {
                log.warn(" -> Path ID {}에 대한 유효한 경로 조합을 찾지 못했습니다.", pathId);
            }
        }

        log.info("--- 최종 최적 경로 선출 시작 ---");
        log.info("STEP 3: 전체 경로 후보들 중에서 최종 Best 경로 1개 선출 (후보: {}개)", finalPathCandidates.size());
        if (log.isDebugEnabled()) {
            finalPathCandidates.forEach(p ->
                    log.debug(" -> 최종 후보: Path ID: {}, 소요시간: {}초, 거리: {}m", p.pathId(), p.totalDuration(), p.totalDistance())
            );
        }

        if (finalPathCandidates.isEmpty()) {
            throw new DispatchException(DispatchErrorCode.CANDIDATE_EMPTY, "최종 경로 후보가 없습니다.");
        }

        // 3. 전체 경로 후보들 중 최종 Best Path 1개 선출
        FinalOldPathDto bestPath = finalPathCandidates.stream()
                .min(Comparator
                        .comparingInt(FinalOldPathDto::totalDuration)
                        .thenComparingInt(FinalOldPathDto::totalDistance)
                )
                .orElseThrow(() -> new DispatchException(DispatchErrorCode.CANDIDATE_EMPTY, "최종 경로 후보에서 최종 경로를 선정하던 중 오류가 발생했습니다."));

        log.info("최종 선택된 최적 경로 -> Path ID: {}, Car ID: {}, 소요시간: {}초, 거리: {}m", bestPath.pathId(), bestPath.carId(), bestPath.totalDuration(), bestPath.totalDistance());
        log.info("Kakao API 호출 시뮬레이션 총 횟수: {} 회", apiCallCounter.get());
        log.info("========= [OldPathDispatchFlow] 기존 경로 배차 로직 종료 =========");

        return bestPath;
    }
}