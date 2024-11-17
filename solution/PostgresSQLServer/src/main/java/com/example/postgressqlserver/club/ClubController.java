package com.example.postgressqlserver.club;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ClubController {
    private final ClubService clubService;

    public ClubController(ClubService clubService) {
        this.clubService = clubService;
    }

    /**
     * Endpoint to retrieve the best clubs based on some criteria.
     * Method: GET
     * Path: /getBestClubsDB
     * @return ResponseEntity<List<Club>> List of Club objects representing the best clubs.
     */
    @GetMapping("/getBestClubsDB")
    public ResponseEntity<List<Club>> getBestClubsDB(){
        List<Club> clubs = clubService.getBestClubsDB(); // Delegate to ClubService to fetch best clubs
        if (!clubs.isEmpty()) {
            return ResponseEntity.ok(clubs); // Return 200 OK with list of best clubs
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Return 404 Not Found if no best clubs found
        }
    }

    /**
     * Endpoint to retrieve all clubs participating in a specific competition.
     * Method: GET
     * Path: /getAllSquadsCompetitionSelectedDB
     * @param competitionId String representing the competition identifier.
     * @return ResponseEntity<List<String>> List of strings containing information about all clubs in the competition.
     */
    @GetMapping("/getAllSquadsCompetitionSelectedDB")
    public ResponseEntity<List<String>> getCompetitions(@RequestParam("competitionId") String competitionId){
        List<String> clubs = clubService.getInfoAllClubs(competitionId); // Delegate to ClubService to fetch clubs in the competition
        if (!clubs.isEmpty()) {
            return ResponseEntity.ok(clubs); // Return 200 OK with list of clubs in the competition
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Return 404 Not Found if no clubs found for given competitionId
        }
    }

    /**
     * Endpoint to retrieve information about a specific club.
     * Method: GET
     * Path: /getInfoClubSelectedDB
     * @param clubId Integer representing the club identifier.
     * @return ResponseEntity<List<String>> List of strings containing information about the selected club.
     */
    @GetMapping("/getInfoClubSelectedDB")
    public ResponseEntity<List<String>> getClubInfo(@RequestParam("clubId") Integer clubId){
        List<String> infoClubSelected = clubService.getInfoClubSelected(clubId); // Delegate to ClubService to fetch club information
        if (!infoClubSelected.isEmpty()) {
            return ResponseEntity.ok(infoClubSelected); // Return 200 OK with information about the club
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Return 404 Not Found if club information not found
        }
    }

    /**
     * Endpoint to retrieve the total value of a specific club based on its assets (e.g., players' market values).
     * Method: GET
     * Path: /getClubValueDB
     * @param clubId Integer representing the club identifier.
     * @return ResponseEntity<Long> Long value representing the calculated total value of the club.
     */
    @GetMapping("/getClubValueDB")
    public ResponseEntity<Long> getClubValue(@RequestParam("clubId") Integer clubId){
        Long clubValue = clubService.getClubValue(clubId); // Delegate to ClubService to calculate club value
        if (clubValue != null) {
            return ResponseEntity.ok(clubValue); // Return 200 OK with club value
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Return 404 Not Found if club value not found
        }
    }

}
