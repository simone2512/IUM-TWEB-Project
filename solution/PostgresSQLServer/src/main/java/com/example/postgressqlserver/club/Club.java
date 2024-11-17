package com.example.postgressqlserver.club;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table (name = "clubs")
public class Club {
    @Id
    @Column(name = "club_id")
    private int clubId;
    @Column(name = "club_code")
    private String clubCode;

    @Column(name = "name")
    private String name;

    @Column(name = "domestic_competition_id")
    private String domesticCompetitionId;

    @Column(name = "squad_size")
    private int squadSize;

    @Column(name = "average_age")
    private double averageAge;

    @Column(name = "foreigners_number")
    private int foreignersNumber;

    @Column(name = "foreigners_percentage")
    private double foreignersPercentage;

    @Column(name = "national_team_players")
    private int nationalTeamPlayers;

    @Column(name = "stadium_name")
    private String stadiumName;

    @Column(name = "stadium_seats")
    private int stadiumSeats;

    @Column(name = "net_transfer_record")
    private String netTransferRecord;

    @Column(name = "last_season")
    private int lastSeason;

    @Column(name = "url")
    private String url;

    public Club() {
    }
    public Club(int clubId, String clubCode, String name, String domesticCompetitionId, int squadSize, double averageAge, int foreignersNumber, double foreignersPercentage, int nationalTeamPlayers, String stadiumName, int stadiumSeats, String netTransferRecord, int lastSeason, String url) {
        this.clubId = clubId;
        this.clubCode = clubCode;
        this.name = name;
        this.domesticCompetitionId = domesticCompetitionId;
        this.squadSize = squadSize;
        this.averageAge = averageAge;
        this.foreignersNumber = foreignersNumber;
        this.foreignersPercentage = foreignersPercentage;
        this.nationalTeamPlayers = nationalTeamPlayers;
        this.stadiumName = stadiumName;
        this.stadiumSeats = stadiumSeats;
        this.netTransferRecord = netTransferRecord;
        this.lastSeason = lastSeason;
        this.url = url;
    }

    public int getClubId() {
        return clubId;
    }

    public void setClubId(int clubId) {
        this.clubId = clubId;
    }

    public String getClubCode() {
        return clubCode;
    }

    public void setClubCode(String clubCode) {
        this.clubCode = clubCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDomesticCompetitionId() {
        return domesticCompetitionId;
    }

    public void setDomesticCompetitionId(String domesticCompetitionId) {
        this.domesticCompetitionId = domesticCompetitionId;
    }

    public int getSquadSize() {
        return squadSize;
    }

    public void setSquadSize(int squadSize) {
        this.squadSize = squadSize;
    }

    public double getAverageAge() {
        return averageAge;
    }

    public void setAverageAge(double averageAge) {
        this.averageAge = averageAge;
    }

    public int getForeignersNumber() {
        return foreignersNumber;
    }

    public void setForeignersNumber(int foreignersNumber) {
        this.foreignersNumber = foreignersNumber;
    }

    public double getForeignersPercentage() {
        return foreignersPercentage;
    }

    public void setForeignersPercentage(double foreignersPercentage) {
        this.foreignersPercentage = foreignersPercentage;
    }

    public int getNationalTeamPlayers() {
        return nationalTeamPlayers;
    }

    public void setNationalTeamPlayers(int nationalTeamPlayers) {
        this.nationalTeamPlayers = nationalTeamPlayers;
    }

    public String getStadiumName() {
        return stadiumName;
    }

    public void setStadiumName(String stadiumName) {
        this.stadiumName = stadiumName;
    }

    public int getStadiumSeats() {
        return stadiumSeats;
    }

    public void setStadiumSeats(int stadiumSeats) {
        this.stadiumSeats = stadiumSeats;
    }

    public String getNetTransferRecord() {
        return netTransferRecord;
    }

    public void setNetTransferRecord(String netTransferRecord) {
        this.netTransferRecord = netTransferRecord;
    }

    public int getLastSeason() {
        return lastSeason;
    }

    public void setLastSeason(int lastSeason) {
        this.lastSeason = lastSeason;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

}

