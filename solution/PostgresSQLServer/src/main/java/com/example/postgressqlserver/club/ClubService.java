package com.example.postgressqlserver.club;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClubService {
    private final ClubRepository clubRepository;

    // Constructor injection for ClubService
    public ClubService(ClubRepository clubRepository){
        this.clubRepository = clubRepository;
    }

    /**
     * Fetches the best clubs based on some criteria.
     * @return List of Club objects representing the best clubs.
     */
    public List<Club> getBestClubsDB(){
        return clubRepository.getBestClubs(); // Delegates to ClubRepository to fetch best clubs
    }

    /**
     * Retrieves information about all clubs participating in a specific competition.
     * @param competitionId String representing the competition identifier.
     * @return List of strings containing information about all clubs in the competition.
     */
    public List<String> getInfoAllClubs(String competitionId){
        return clubRepository.findAllInfoClubs(competitionId); // Delegates to ClubRepository to fetch clubs in the competition
    }

    /**
     * Retrieves detailed information about a specific club.
     * @param clubId Integer representing the club identifier.
     * @return List of strings containing information about the selected club.
     */
    public List<String> getInfoClubSelected(Integer clubId) {
        return clubRepository.findAllInfoClubSelected(clubId); // Delegates to ClubRepository to fetch club information
    }

    /**
     * Calculates and retrieves the total value of a specific club based on its assets (e.g., players' market values).
     * @param clubId Integer representing the club identifier.
     * @return Long value representing the calculated total value of the club.
     */
    public Long getClubValue(Integer clubId){
        return clubRepository.calculateClubValue(clubId); // Delegates to ClubRepository to calculate club value
    }
}
