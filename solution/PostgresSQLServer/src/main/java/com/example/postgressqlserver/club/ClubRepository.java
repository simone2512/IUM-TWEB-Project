package com.example.postgressqlserver.club;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClubRepository extends JpaRepository<Club, Integer> {

    /**
     * Retrieves information about all clubs participating in a specific competition.
     * @param competitionId String representing the competition identifier.
     * @return List of strings containing information about all clubs in the competition.
     */
    @Query(value = "SELECT * FROM clubs WHERE clubs.domestic_competition_id = :competitionId", nativeQuery = true)
    List<String> findAllInfoClubs(@Param("competitionId") String competitionId);

    /**
     * Retrieves detailed information about a specific club.
     * @param clubId Integer representing the club identifier.
     * @return List of strings containing information about the selected club.
     */
    @Query(value = "SELECT * FROM clubs WHERE clubs.club_id = :clubId", nativeQuery = true)
    List<String> findAllInfoClubSelected(@Param("clubId") Integer clubId);

    /**
     * Retrieves the top 3 best clubs based on the sum of their players' market values.
     * @return List of Club objects representing the best clubs.
     */
    @Query(value = "SELECT c.* " +
            "FROM players p " +
            "JOIN clubs c ON p.current_club_id = c.club_id " +
            "GROUP BY c.club_id, c.name " +
            "ORDER BY SUM(COALESCE(p.market_value_in_eur, 0)) DESC " +
            "LIMIT 3", nativeQuery = true)
    List<Club> getBestClubs();

    /**
     * Calculates the total market value of a specific club based on its players' market values.
     * @param clubId Integer representing the club identifier.
     * @return Long value representing the calculated total value of the club.
     */
    @Query(value = "SELECT SUM(COALESCE(p.market_value_in_eur, 0)) " +
            "FROM players p " +
            "WHERE p.current_club_id = :clubId", nativeQuery = true)
    Long calculateClubValue(@Param("clubId") Integer clubId);
}
