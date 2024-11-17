package com.example.postgressqlserver.player;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Integer> {

    /**
     * Retrieves the best players based on their market value.
     * @param limit The maximum number of best players to retrieve.
     * @return List of Player objects representing the best players.
     */
    @Query(value =  "SELECT * " +
            "FROM players " +
            "WHERE market_value_in_eur IS NOT NULL " +
            "ORDER BY market_value_in_eur DESC " +
            "LIMIT :limit", nativeQuery = true)
    List<Player> findBestPlayers(@Param("limit") Integer limit);

    /**
     * Retrieves the name of a player by player_id.
     * @param player_id The ID of the player.
     * @return String representing the name of the player.
     */
    @Query(value =  "SELECT name "+
            "FROM players " +
            "WHERE player_id = :player_id", nativeQuery = true)
    String findPlayerNameById(@Param("player_id")Integer player_id);

    /**
     * Retrieves player IDs, names, and image URLs of players belonging to a specific club in a given season.
     * @param clubId The ID of the club.
     * @return List of String representing player IDs, names, and image URLs.
     */
    @Query(value =  "SELECT player_id, name , image_url " +
            "FROM players " +
            "WHERE current_club_id = :clubId AND last_season = 2023 " +
            "ORDER BY market_value_in_eur DESC", nativeQuery = true)
    List<String> findPlayersByClubId(@Param("clubId") int clubId);

    /**
     * Retrieves detailed information of a player by player_id.
     * @param playerId The ID of the player.
     * @return Player object representing the detailed information of the player.
     */
    @Query(value =  "SELECT * " +
            "FROM players " +
            "WHERE player_id = :playerId " , nativeQuery = true )
    Player findAllInfoPlayerSelected(@Param("playerId") Integer playerId);

    /**
     * Retrieves all distinct countries of citizenship from the players table.
     * @return List of String representing all distinct countries of citizenship.
     */
    @Query(value =  "SELECT country_of_citizenship " +
            "FROM players " +
            "WHERE country_of_citizenship IS NOT NULL " +
            "GROUP BY country_of_citizenship " +
            "ORDER BY country_of_citizenship", nativeQuery = true)
    List<String> getAllCountriesDB();

    /**
     * Retrieves players filtered by various parameters, paginated.
     * @param competitionId The ID of the competition (optional).
     * @param clubId The ID of the club (optional).
     * @param nationality The nationality of the players (optional).
     * @param position The playing position of the players (optional).
     * @param subPosition The sub-position of the players (optional).
     * @param foot The preferred foot of the players (optional).
     * @param pageable Pagination information.
     * @return Page of Player objects representing the filtered players.
     */
    @Query(value =  "SELECT * " +
            "FROM players " +
            "WHERE (:competitionId IS NULL OR current_club_domestic_competition_id = :competitionId) " +
            "AND (:clubId IS NULL OR current_club_id = :clubId) " +
            "AND (:nationality IS NULL OR country_of_citizenship = :nationality) " +
            "AND (:position IS NULL OR position = :position) " +
            "AND (:subPosition IS NULL OR sub_position = :subPosition) " +
            "AND (:foot IS NULL OR foot = :foot OR foot = 'both') " +
            "AND (last_season = 2023) " +
            "ORDER BY CASE WHEN market_value_in_eur IS NULL THEN 1 ELSE 0 END, market_value_in_eur DESC",
            nativeQuery = true)
    Page<Player> findAllPlayersFiltered(
            @Param("competitionId") String competitionId,
            @Param("clubId") Integer clubId,
            @Param("nationality") String nationality,
            @Param("position") String position,
            @Param("subPosition") String subPosition,
            @Param("foot") String foot,
            Pageable pageable);
}
