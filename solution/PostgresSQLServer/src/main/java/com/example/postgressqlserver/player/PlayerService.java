package com.example.postgressqlserver.player;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PlayerService {

    private final PlayerRepository playerRepository; // Injected PlayerRepository instance

    // Constructor injection for PlayerService
    public PlayerService(PlayerRepository playerRepository){
        this.playerRepository = playerRepository;
    }

    /**
     * Retrieves the best players based on some criteria.
     * @return List of Player objects representing the best players.
     */
    public List<Player> getBestPlayers(){
        return playerRepository.findBestPlayers(3); // Delegate to PlayerRepository to fetch best players
    }

    /**
     * Retrieves detailed information of a player based on clubId.
     * @param clubId The clubId of the player.
     * @return Player object representing the detailed information of the player.
     */
    public Player getInfoPlayerSelected(Integer clubId){
        return playerRepository.findAllInfoPlayerSelected(clubId); // Delegate to PlayerRepository to fetch player information by clubId
    }

    /**
     * Retrieves all countries from the database.
     * @return List of String representing all countries.
     */
    public List<String> getAllCountriesDB(){
        return playerRepository.getAllCountriesDB(); // Delegate to PlayerRepository to fetch all countries
    }

    /**
     * Retrieves player IDs and names of players belonging to a specific club.
     * @param clubId The clubId of the club.
     * @return List of String representing player IDs and names.
     */
    public List<String> getAllPlayerIdAndNamesofClub(Integer clubId){
        return playerRepository.findPlayersByClubId(clubId); // Delegate to PlayerRepository to fetch player IDs and names by clubId
    }

    /**
     * Retrieves player name based on playerId.
     * @param player_id The playerId of the player.
     * @return String representing the name of the player.
     */
    public String getPlayerNameById(Integer player_id){
        return playerRepository.findPlayerNameById(player_id); // Delegate to PlayerRepository to fetch player name by playerId
    }
}
