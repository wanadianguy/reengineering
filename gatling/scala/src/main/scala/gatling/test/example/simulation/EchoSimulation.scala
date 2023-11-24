package gatling.test.example.simulation

import gatling.test.example.simulation.PerfTestConfig._
import io.gatling.core.Predef.{StringBody, constantUsersPerSec, global, scenario, _}
import io.gatling.http.Predef.{http, status, _}

import scala.concurrent.duration._
import scala.language.postfixOps
import scala.util.Random

class EchoSimulation extends Simulation {

  val httpConf = http.baseUrl(baseUrl)
  val rootEndPointUsers = scenario("Root end point calls")
    .exec(http("Get all artists 1")
      .get("/artists")
      .check(status.is(200))
    )
    .exec(session=> session.set("requestId",generateUniqueId())
    ).exec(http("Create artist")
      .post("/artists")
      .header("Content-Type", "application/json")
      .header("Accept-Encoding", "application/json")
      .body(StringBody("{\"name\":\"Artist_#{requestId}\",\"image\":\"https://marvel-b1-cdn.bc0a.com/f00000000209359/news.uoguelph.ca/wp-content/uploads/2016/07/cat.jpg\"}"))
      .check(status.is(200))
      .check(regex("\"id\":(\\d+),").saveAs("createdId"))
    ).exec(http("Get all artists 2")
      .get("/artists")
      .check(status.is(200))
    ).exec(http("Get artist")
      .get("/artists/#{createdId}")
      .check(status.is(200))
    ).exec(http("Get artist songs")
      .get("/artists/#{createdId}/songs")
      .check(status.is(200))
    ).exec(http("delete artist")
      .delete("/artists/#{createdId}")
      .check(status.is(200))
    )
  setUp(rootEndPointUsers.inject(
    constantUsersPerSec(PerfTestConfig.requestPerSecond) during (durationMin minutes))
    .protocols(httpConf))
    .assertions(
      global.responseTime.max.lt(maxResponseTimeMs),
      global.responseTime.mean.lt(meanResponseTimeMs),
      global.responseTime.percentile3.lt(p95ResponseTimeMs),
      global.successfulRequests.percent.gt(95)
    )

  def generateUniqueId(): String = {
    val random = new Random()
    val uniqueId = random.nextInt(Int.MaxValue - 1)
    uniqueId.toString
  }
}


