package com.example.postgressqlserver.competition;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompetitionRepository extends JpaRepository<Competition, String> {

    /**
     * Retrieves all competitions from the database.
     * @return List of Competition objects representing all competitions.
     */
    @Query(value = "SELECT * FROM competitions", nativeQuery = true)
    List<Competition> findAllCompetitions();

    /**
     * Retrieves information of a selected competition by its competitionId.
     * @param competitionId String representing the competition identifier.
     * @return List of strings containing information about the selected competition.
     */
    @Query(value = "SELECT * FROM competitions WHERE competitions.competition_id = :competitionId", nativeQuery = true)
    List<String> findAllInfoCompetitionSelected(@Param("competitionId") String competitionId);

    /**
     * Retrieves all domestic competitions from the database.
     * @return List of Competition objects representing domestic competitions.
     */
    @Query(value = "SELECT * FROM competitions WHERE sub_type = 'first_tier'", nativeQuery = true)
    List<Competition> findAllDomesticCompetitions();

    /**
     * Retrieves the best competitions based on the sum of players' market values in descending order.
     * Limits the result to the top 3 competitions.
     * @return List of Competition objects representing the best competitions.
     */
    @Query(value = "SELECT c.* " +
            "FROM players p " +
            "JOIN clubs cl ON p.current_club_id = cl.club_id " +
            "JOIN competitions c ON cl.domestic_competition_id = c.competition_id " +
            "GROUP BY c.competition_id, c.name " +
            "ORDER BY SUM(p.market_value_in_eur) DESC " +
            "LIMIT 3", nativeQuery = true)
    List<Competition> getBestCompetitions();

    /**
     * Calculates the total market value of players participating in a specific competition.
     * @param competitionId String representing the competition identifier.
     * @return Long value representing the calculated total market value of the competition.
     */
    @Query(value = "SELECT SUM(p.market_value_in_eur) " +
            "FROM players p " +
            "JOIN clubs cl ON p.current_club_id = cl.club_id " +
            "WHERE cl.domestic_competition_id = :competitionId", nativeQuery = true)
    Long calculateCompetitionValue(@Param("competitionId") String competitionId);
}
