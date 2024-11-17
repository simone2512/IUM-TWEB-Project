package com.example.postgressqlserver.competition;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "competitions")
public class Competition {
    @Id
    @Column(name = "competition_id")
    private String competitionId;

    @Column(name = "competition_code")
    private String competitionCode;

    @Column(name = "name")
    private String name;

    @Column(name = "sub_type")
    private String subType;

    @Column(name = "type")
    private String type;

    @Column(name = "country_id")
    private int countryId;

    @Column(name = "country_name")
    private String countryName;

    @Column(name = "domestic_league_code")
    private String domesticLeagueCode;

    @Column(name = "confederation")
    private String confederation;

    @Column(name = "url")
    private String url;

    public Competition() {
    }

    public Competition(String competitionId, String competitionCode, String name, String subType, String type, int countryId, String countryName, String domesticLeagueCode, String confederation, String url) {
        this.competitionId = competitionId;
        this.competitionCode = competitionCode;
        this.name = name;
        this.subType = subType;
        this.type = type;
        this.countryId = countryId;
        this.countryName = countryName;
        this.domesticLeagueCode = domesticLeagueCode;
        this.confederation = confederation;
        this.url = url;
    }

    public String getCompetitionId() {
        return competitionId;
    }

    public String getCompetitionCode() {
        return competitionCode;
    }

    public String getName() {
        return name;
    }

    public String getSubType() {
        return subType;
    }

    public String getType() {
        return type;
    }

    public int getCountryId() {
        return countryId;
    }

    public String getCountryName() {
        return countryName;
    }

    public String getDomesticLeagueCode() {
        return domesticLeagueCode;
    }

    public String getConfederation() {
        return confederation;
    }

    public String getUrl() {
        return url;
    }

    public void setCompetitionId(String competitionId) {
        this.competitionId = competitionId;
    }

    public void setCompetitionCode(String competitionCode) {
        this.competitionCode = competitionCode;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSubType(String subType) {
        this.subType = subType;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setCountryId(int countryId) {
        this.countryId = countryId;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public void setDomesticLeagueCode(String domesticLeagueCode) {
        this.domesticLeagueCode = domesticLeagueCode;
    }

    public void setConfederation(String confederation) {
        this.confederation = confederation;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
