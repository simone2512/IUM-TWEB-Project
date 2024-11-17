package com.example.postgressqlserver.competition;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CompetitionController {

    private final CompetitionService competitionService;

    public CompetitionController(CompetitionService competitionService) {
        this.competitionService = competitionService;
    }

    /**
     * Endpoint to get all competitions from the database.
     * Method: GET
     * Path: /getAllCompetitionsDB
     * @return ResponseEntity<List<Competition>> List of Competition objects
     */
    @GetMapping("/getAllCompetitionsDB")
    public ResponseEntity<List<Competition>> getAllCompetitions(){
        List<Competition> competitions = competitionService.getAllCompetitions();
        if (!competitions.isEmpty()) {
            return ResponseEntity.ok(competitions); // Return 200 OK with list of competitions
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Return 404 Not Found if no competitions found
        }
    }

    /**
     * Endpoint to get information about a selected competition by competition ID.
     * Method: GET
     * Path: /getInfoCompetitionSelectedDB
     * @param competitionId ID of the competition
     * @return ResponseEntity<List<String>> List of strings containing information about the competition
     */
    @GetMapping("/getInfoCompetitionSelectedDB")
    public ResponseEntity<List<String>> getInfoLeagueSelected(@RequestParam("competitionId") String competitionId){
        List<String> infoCompetitionSelected = competitionService.getInfoCompetitionSelected(competitionId);
        if (!infoCompetitionSelected.isEmpty()) {
            return ResponseEntity.ok(infoCompetitionSelected); // Return 200 OK with info of selected competition
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Return 404 Not Found if no info found for given competitionId
        }
    }

    /**
     * Endpoint to get all domestic competitions from the database.
     * Method: GET
     * Path: /getAllDomesticCompetitionsDB
     * @return ResponseEntity<List<Competition>> List of Competition objects representing domestic competitions
     */
    @GetMapping("/getAllDomesticCompetitionsDB")
    public ResponseEntity<List<Competition>> getAllDomesticCompetitions(){
        List<Competition> competitions = competitionService.getAllDomesticCompetitions();
        if (!competitions.isEmpty()) {
            return ResponseEntity.ok(competitions); // Return 200 OK with list of domestic competitions
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Return 404 Not Found if no domestic competitions found
        }
    }

    /**
     * Endpoint to get the best competitions from the database based on some criteria.
     * Method: GET
     * Path: /getBestCompetitionsDB
     * @return ResponseEntity<List<Competition>> List of Competition objects representing the best competitions
     */
    @GetMapping("/getBestCompetitionsDB")
    public ResponseEntity<List<Competition>> getBestCompetitionsDB(){
        List<Competition> competitions = competitionService.getBestCompetitionsDB();
        if (!competitions.isEmpty()) {
            return ResponseEntity.ok(competitions); // Return 200 OK with list of best competitions
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Return 404 Not Found if no best competitions found
        }
    }

    /**
     * Endpoint to get the value of a competition based on the competition ID.
     * Method: GET
     * Path: /getCompetitionValueDB
     * @param competitionId ID of the competition
     * @return ResponseEntity<Long> Long value representing the competition's value
     */
    @GetMapping("/getCompetitionValueDB")
    public ResponseEntity<Long> getCompetitionValue(@RequestParam("competitionId") String competitionId){
        Long competitionValue = competitionService.getCompetitionValue(competitionId);
        if (competitionValue != null) {
            return ResponseEntity.ok(competitionValue); // Return 200 OK with competition value
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Return 404 Not Found if competition value not found
        }
    }
}
