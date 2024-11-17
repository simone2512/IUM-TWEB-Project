package com.example.postgressqlserver.player;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PlayerController {

    private final PlayerService playerService; // Injected PlayerService instance
    private final PlayerRepository playerRepository; // Injected PlayerRepository instance

    /**
     * Constructor injection for PlayerController.
     * @param playerService Instance of PlayerService to delegate business logic.
     * @param playerRepository Instance of PlayerRepository for data access.
     */
    public PlayerController(PlayerService playerService, PlayerRepository playerRepository) {
        this.playerService = playerService;
        this.playerRepository = playerRepository;
    }

    /**
     * Endpoint to get the list of best players from the database.
     * Method: GET
     * Path: /getBestPlayersDB
     * @return List of Player objects representing the best players.
     */
    @GetMapping("/getBestPlayersDB")
    public ResponseEntity<List<Player>> getBestPlayers() {
        List<Player> players = playerService.getBestPlayers(); // Delegate to PlayerService to fetch best players

        if (!players.isEmpty()) {
            return ResponseEntity.ok(players); // Return 200 OK with list of players
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Return 404 Not Found if no players found
        }
    }

    /**
     * Endpoint to get the list of players of a club by clubId.
     * Method: GET
     * Path: /getPlayerSquadDB
     * @param clubId Integer representing the club identifier.
     * @return List of strings representing player names of the club.
     */
    @GetMapping("/getPlayerSquadDB")
    public ResponseEntity<List<String>> getPlayersofClub(@RequestParam("clubId") Integer clubId) {
        List<String> players = playerService.getAllPlayerIdAndNamesofClub(clubId); // Delegate to PlayerService to fetch players of a club

        if (!players.isEmpty()) {
            return ResponseEntity.ok(players); // Return 200 OK with list of player names
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Return 404 Not Found if no players found
        }
    }

    /**
     * Endpoint to get detailed information of a player by playerId.
     * Method: GET
     * Path: /getInfoPlayerSelectedDB
     * @param playerId Integer representing the player identifier.
     * @return Player object containing detailed information of the player.
     */
    @GetMapping("/getInfoPlayerSelectedDB")
    public ResponseEntity<Player> getPlayerInfo(@RequestParam("playerId") Integer playerId) {
        Player infoPlayerSelected = playerService.getInfoPlayerSelected(playerId); // Delegate to PlayerService to fetch player information

        if (infoPlayerSelected != null) {
            return ResponseEntity.ok(infoPlayerSelected); // Return 200 OK with player information
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Return 404 Not Found if player not found
        }
    }

    /**
     * Endpoint to get the list of all countries where players are from.
     * Method: GET
     * Path: /getAllCountriesDB
     * @return List of strings representing country names.
     */
    @GetMapping("/getAllCountriesDB")
    public ResponseEntity<List<String>> getAllCountriesDB() {
        List<String> countries = playerService.getAllCountriesDB(); // Delegate to PlayerService to fetch all countries

        if (!countries.isEmpty()) {
            return ResponseEntity.ok(countries); // Return 200 OK with list of countries
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Return 404 Not Found if no countries found
        }
    }

    /**
     * Endpoint to get the name of a player by playerId.
     * Method: GET
     * Path: /getPlayerNameById
     * @param player_id Integer representing the player identifier.
     * @return String containing the name of the player.
     */
    @GetMapping("/getPlayerNameById")
    public ResponseEntity<String> getPlayerNameById(@RequestParam(value = "player_id") Integer player_id){
        String name = playerService.getPlayerNameById(player_id); // Delegate to PlayerService to fetch player name by playerId

        if (name != null) {
            return ResponseEntity.ok(name); // Return 200 OK with player name
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Return 404 Not Found if player not found
        }
    }

    /**
     * Endpoint to get paginated and filtered list of players based on criteria.
     * Method: GET
     * Path: /getAllPlayersFiltered
     * @param competitionId Optional String representing the competition identifier.
     * @param clubId Optional Integer representing the club identifier.
     * @param nationality Optional String representing the nationality.
     * @param position Optional String representing the player position.
     * @param subPosition Optional String representing the player sub-position.
     * @param foot Optional String representing the player dominant foot.
     * @param page Integer representing the page number for pagination.
     * @param size Integer representing the size of each page for pagination.
     * @return Page of Player objects containing filtered player data.
     */
    @GetMapping("/getAllPlayersFiltered")
    public ResponseEntity<Page<Player>> getPlayersFiltered(
            @RequestParam(required = false) String competitionId,
            @RequestParam(required = false) Integer clubId,
            @RequestParam(required = false) String nationality,
            @RequestParam(required = false) String position,
            @RequestParam(required = false) String subPosition,
            @RequestParam(required = false) String foot,
            @RequestParam int page,
            @RequestParam int size) {

        Pageable pageable = PageRequest.of(page, size); // Pagination parameters
        Page<Player> playersPage = playerRepository.findAllPlayersFiltered(competitionId, clubId, nationality, position, subPosition, foot, pageable); // Delegate to PlayerRepository to fetch filtered players

        if (!playersPage.isEmpty()) {
            return ResponseEntity.ok(playersPage); // Return 200 OK with paginated players
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Return 404 Not Found if no players found
        }
    }

}
