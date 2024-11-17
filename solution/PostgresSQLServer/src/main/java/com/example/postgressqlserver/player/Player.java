package com.example.postgressqlserver.player;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "players")
public class Player {
    @Id
    @Column(name = "player_id")
    private Integer playerId;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "name")
    private String name;

    @Column(name = "last_season")
    private int lastSeason;

    @Column(name = "current_club_id")
    private int currentClubId;

    @Column(name = "player_code")
    private String playerCode;

    @Column(name = "country_of_birth")
    private String countryOfBirth;

    @Column(name = "city_of_birth")
    private String cityOfBirth;

    @Column(name = "country_of_citizenship")
    private String countryOfCitizenship;

    @Column(name = "date_of_birth")
    @Temporal(TemporalType.DATE)
    private Date dateOfBirth;

    @Column(name = "sub_position")
    private String subPosition;

    @Column(name = "position")
    private String position;

    @Column(name = "foot")
    private String foot;

    @Column(name = "height_in_cm")
    private Integer heightInCm;

    @Column(name = "market_value_in_eur")
    private Integer marketValueInEur;

    @Column(name = "highest_market_value_in_eur")
    private Integer highestMarketValueInEur;

    @Column(name = "contract_expiration_date")
    @Temporal(TemporalType.DATE)
    private Date contractExpirationDate;

    @Column(name = "agent_name")
    private String agentName;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "url")
    private String url;

    @Column(name = "current_club_domestic_competition_id")
    private String currentClubDomesticCompetitionId;

    @Column(name = "current_club_name")
    private String currentClubName;

    public Player() {
    }

    public Player(int playerId, String firstName, String lastName, String name, int lastSeason, int currentClubId, String playerCode, String countryOfBirth, String cityOfBirth, String countryOfCitizenship, Date dateOfBirth, String subPosition, String position, String foot, Integer heightInCm, Integer marketValueInEur, int highestMarketValueInEur, Date contractExpirationDate, String agentName, String imageUrl, String url, String currentClubDomesticCompetitionId, String currentClubName) {
        this.playerId = playerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.name = name;
        this.lastSeason = lastSeason;
        this.currentClubId = currentClubId;
        this.playerCode = playerCode;
        this.countryOfBirth = countryOfBirth;
        this.cityOfBirth = cityOfBirth;
        this.countryOfCitizenship = countryOfCitizenship;
        this.dateOfBirth = dateOfBirth;
        this.subPosition = subPosition;
        this.position = position;
        this.foot = foot;
        this.heightInCm = heightInCm;
        this.marketValueInEur = marketValueInEur;
        this.highestMarketValueInEur = highestMarketValueInEur;
        this.contractExpirationDate = contractExpirationDate;
        this.agentName = agentName;
        this.imageUrl = imageUrl;
        this.url = url;
        this.currentClubDomesticCompetitionId = currentClubDomesticCompetitionId;
        this.currentClubName = currentClubName;
    }

    public int getPlayerId() {
        return playerId;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getName() {
        return name;
    }

    public int getLastSeason() {
        return lastSeason;
    }

    public int getCurrentClubId() {
        return currentClubId;
    }

    public String getPlayerCode() {
        return playerCode;
    }

    public String getCountryOfBirth() {
        return countryOfBirth;
    }

    public String getCityOfBirth() {
        return cityOfBirth;
    }

    public String getCountryOfCitizenship() {
        return countryOfCitizenship;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public String getSubPosition() {
        return subPosition;
    }

    public String getPosition() {
        return position;
    }

    public String getFoot() {
        return foot;
    }

    public Integer getHeightInCm() {
        return heightInCm;
    }

    public Integer getMarketValueInEur() {
        return marketValueInEur;
    }

    public int getHighestMarketValueInEur() {
        return highestMarketValueInEur;
    }

    public Date getContractExpirationDate() {
        return contractExpirationDate;
    }

    public String getAgentName() {
        return agentName;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getUrl() {
        return url;
    }

    public String getCurrentClubDomesticCompetitionId() {
        return currentClubDomesticCompetitionId;
    }

    public String getCurrentClubName() {
        return currentClubName;
    }

    public void setPlayerId(int playerId) {
        this.playerId = playerId;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLastSeason(int lastSeason) {
        this.lastSeason = lastSeason;
    }

    public void setCurrentClubId(int currentClubId) {
        this.currentClubId = currentClubId;
    }

    public void setPlayerCode(String playerCode) {
        this.playerCode = playerCode;
    }

    public void setCountryOfBirth(String countryOfBirth) {
        this.countryOfBirth = countryOfBirth;
    }

    public void setCityOfBirth(String cityOfBirth) {
        this.cityOfBirth = cityOfBirth;
    }

    public void setCountryOfCitizenship(String countryOfCitizenship) {
        this.countryOfCitizenship = countryOfCitizenship;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public void setSubPosition(String subPosition) {
        this.subPosition = subPosition;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public void setFoot(String foot) {
        this.foot = foot;
    }

    public void setHeightInCm(Integer heightInCm) {
        this.heightInCm = heightInCm;
    }

    public void setMarketValueInEur(Integer marketValueInEur) {
        this.marketValueInEur = marketValueInEur;
    }

    public void setHighestMarketValueInEur(Integer highestMarketValueInEur) {
        this.highestMarketValueInEur = highestMarketValueInEur;
    }

    public void setContractExpirationDate(Date contractExpirationDate) {
        this.contractExpirationDate = contractExpirationDate;
    }

    public void setAgentName(String agentName) {
        this.agentName = agentName;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setCurrentClubDomesticCompetitionId(String currentClubDomesticCompetitionId) {
        this.currentClubDomesticCompetitionId = currentClubDomesticCompetitionId;
    }

    public void setCurrentClubName(String currentClubName) {
        this.currentClubName = currentClubName;
    }
}

