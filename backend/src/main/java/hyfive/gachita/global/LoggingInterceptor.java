package hyfive.gachita.global;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.UUID;

@Slf4j
@Component
public class LoggingInterceptor implements HandlerInterceptor {

    private static final String LOG_ID = "logId";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String requestURI = request.getRequestURI();
        String method = request.getMethod();

        String uuid = UUID.randomUUID().toString().substring(0, 8);
        request.setAttribute(LOG_ID, uuid);

        long startTime = System.currentTimeMillis();
        request.setAttribute("startTime", startTime);

        log.info("REQUEST  [{}][{}][{}]", uuid, method, requestURI);
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        String requestURI = request.getRequestURI();
        String method = request.getMethod();
        String uuid = (String) request.getAttribute(LOG_ID);

        long startTime = (Long) request.getAttribute("startTime");
        long endTime = System.currentTimeMillis();
        long duration = endTime - startTime;

        log.info("RESPONSE [{}][{}][{}][{}ms]", uuid, method, requestURI, duration);

        if (ex != null) {
            log.error("EXCEPTION [{}][{}][{}]", uuid, method, requestURI, ex);
        }
    }
}
