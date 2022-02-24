package test.declaration;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Declaration {
    private String username;
    private float temperature;
    private boolean hasSymptoms;
    private boolean isCloseContact;
    private long submittedDate;
    public Declaration(String username, float temperature, boolean hasSymptoms, boolean isCloseContact,
            long submittedDate) {
        this.username = username;
        this.temperature = temperature;
        this.hasSymptoms = hasSymptoms;
        this.isCloseContact = isCloseContact;
        this.submittedDate = submittedDate;
    }
    @JsonProperty("username")
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    @JsonProperty("temperature")
    public float getTemperature() {
        return temperature;
    }
    public void setTemperature(float temperature) {
        this.temperature = temperature;
    }
    @JsonProperty("hasSymptoms")
    public boolean hasSymptoms() {
        return hasSymptoms;
    }
    public void setHasSymptoms(boolean hasSymptoms) {
        this.hasSymptoms = hasSymptoms;
    }
    @JsonProperty("isCloseContact")
    public boolean isCloseContact() {
        return isCloseContact;
        
    }
    public void setCloseContact(boolean isCloseContact) {
        this.isCloseContact = isCloseContact;
    }
    @JsonProperty("submittedDate")
    public long getSubmittedDate() {
        return submittedDate;
    }
    public void setSubmittedDate(long submittedDate) {
        this.submittedDate = submittedDate;
        
    }
}