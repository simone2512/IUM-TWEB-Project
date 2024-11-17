package com.example.postgressqlserver.competition;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompetitionService {

    private final CompetitionRepository competitionRepository;

    /**
     * Constructor injection for CompetitionService.
     * @param competitionRepository Instance of CompetitionRepository for data access.
     */
    public CompetitionService(CompetitionRepository competitionRepository){
        this.competitionRepository = competitionRepository;
    }

    /**
     * Fetches all competitions from the database.
     * @return List of Competition objects representing all competitions.
     */
    public List<Competition> getAllCompetitions(){
        return competitionRepository.findAllCompetitions();
    }

    /**
     * Fetches information of a selected competition by its competitionId.
     * @param competitionId String representing the competition identifier.
     * @return List of strings containing information about the selected competition.
     */
    public List<String> getInfoCompetitionSelected(String competitionId){
        return competitionRepository.findAllInfoCompetitionSelected(competitionId);
    }

    /**
     * Fetches all domestic competitions from the database.
     * @return List of Competition objects representing domestic competitions.
     */
    public List<Competition> getAllDomesticCompetitions(){
        return competitionRepository.findAllDomesticCompetitions();
    }

    /**
     * Fetches the best competitions based on certain criteria.
     * @return List of Competition objects representing the best competitions.
     */
    public List<Competition> getBestCompetitionsDB(){
        return competitionRepository.getBestCompetitions();
    }

    /**
     * Calculates and retrieves the value of a competition based on its competitionId.
     * @param competitionId String representing the competition identifier.
     * @return Long value representing the calculated competition value.
     */
    public Long getCompetitionValue(String competitionId){
        return competitionRepository.calculateCompetitionValue(competitionId);
    }
}
