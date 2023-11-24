package gatling.test.example.simulation;

import io.gatling.javaapi.core.ScenarioBuilder;
import io.gatling.javaapi.core.Simulation;
import io.gatling.javaapi.http.HttpProtocolBuilder;

import java.time.Duration;
import java.util.Random;

import static gatling.test.example.simulation.PerfTestConfig.*;
import static io.gatling.javaapi.core.CoreDsl.*;
import static io.gatling.javaapi.http.HttpDsl.http;
import static io.gatling.javaapi.http.HttpDsl.status;

public class EchoSimulation extends Simulation {

    HttpProtocolBuilder httpProtocol = http.baseUrl(BASE_URL)
            .header("Content-Type", "application/json")
            .header("Accept-Encoding", "gzip")
            .check(status().is(200));

    ScenarioBuilder scn = scenario("Root end point calls")
        .exec(http("Get all artists 1")
                .get("/artists")
                .check(status().is(200))
        )
        .exec(session-> session.set("requestId",generateUniqueId())
        ).exec(http("Create artist")
                .post("/artists")
                .header("Content-Type", "application/json")
                .header("Accept-Encoding", "application/json")
                .body(StringBody("{\"name\":\"Artist_#{requestId}\",\"image\":\"https://marvel-b1-cdn.bc0a.com/f00000000209359/news.uoguelph.ca/wp-content/uploads/2016/07/cat.jpg\"}"))
                .check(status().is(200))
                .check(regex("\"id\":(\\d+),").saveAs("createdId"))
        ).exec(http("Get all artists 2")
                .get("/artists")
                .check(status().is(200))
        ).exec(http("Get artist")
                .get("/artists/#{createdId}")
                .check(status().is(200))
        ).exec(http("Get artist songs")
                .get("/artists/#{createdId}/songs")
                .check(status().is(200))
        ).exec(http("delete artist")
                .delete("/artists/#{createdId}")
                .check(status().is(200))
        );

    {
        setUp(scn.injectOpen(constantUsersPerSec(REQUEST_PER_SECOND).during(Duration.ofMinutes(DURATION_MIN))))
                .protocols(httpProtocol)
                .assertions(global().responseTime().percentile3().lt(P95_RESPONSE_TIME_MS),
                        global().successfulRequests().percent().gt(95.0))
        ;
    }

    private Integer generateUniqueId(){
        Random r = new Random();
        return r.nextInt(Integer.MAX_VALUE);
    }
}