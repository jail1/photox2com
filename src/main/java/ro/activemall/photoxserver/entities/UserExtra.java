package ro.activemall.photoxserver.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@Entity(name = "extra")
@Table(name = "photox_users_extra")
public class UserExtra implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@JsonIgnore
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	protected Long id;

	@JsonIgnore
	public Long getId() {
		return id;
	}

	@JsonIgnore
	public void setId(Long id) {
		this.id = id;
	}
	
	@JsonIgnore
	@OneToOne
	@JoinColumn(name = "owner_id")
	private User owner;
	@JsonInclude(Include.NON_NULL)
	@Column(name = "logo_url", nullable=true)
	private String logoUrl;
	@JsonInclude(Include.NON_NULL)
	@Column(name = "facebook_id", nullable=true)
	private String facebookId;
	@JsonInclude(Include.NON_NULL)
	@Column(name = "twitter_id", nullable=true)
	private String twitterId;
	@JsonInclude(Include.NON_NULL)
	@Column(name = "googleplus_id", nullable=true)
	private String googlePlusId;
	
	@Column(name = "max_disk_quota", nullable=false)
	private Long maxDiskQuota = 0L;
	
	@Column(name = "current_disk_quota", nullable=false)
	private Long currentDiskQuota = 0L;
	
	@Column(name = "current_budget", nullable=false)
	private Double currentBudget = 0d;
	
	@Column(name = "minimum_required_budget", nullable=false)
	private Double minimumRequiredBudget = 0d;
	
	@Column(name = "max_allowed_accounts", nullable=false)
	private Long maxAllowedAccounts = 1L;
	
	@Column(name = "current_discount_percent", nullable=false)
	private Long currentDiscountPercent = 10L;

	@JsonIgnore
	public User getOwner() {
		return owner;
	}

	@JsonIgnore
	public void setOwner(User owner) {
		this.owner = owner;
	}
	@JsonInclude(Include.NON_NULL)
	public String getLogoUrl() {
		return logoUrl;
	}
	@JsonInclude(Include.NON_NULL)
	public void setLogoUrl(String logoUrl) {
		this.logoUrl = logoUrl;
	}
	@JsonInclude(Include.NON_NULL)
	public String getFacebookId() {
		return facebookId;
	}
	@JsonInclude(Include.NON_NULL)
	public void setFacebookId(String facebookId) {
		this.facebookId = facebookId;
	}
	@JsonInclude(Include.NON_NULL)
	public String getTwitterId() {
		return twitterId;
	}
	@JsonInclude(Include.NON_NULL)
	public void setTwitterId(String twitterId) {
		this.twitterId = twitterId;
	}
	@JsonInclude(Include.NON_NULL)
	public String getGooglePlusId() {
		return googlePlusId;
	}
	@JsonInclude(Include.NON_NULL)
	public void setGooglePlusId(String googlePlusId) {
		this.googlePlusId = googlePlusId;
	}

	public Long getMaxDiskQuota() {
		return maxDiskQuota;
	}

	public void setMaxDiskQuota(Long maxDiskQuota) {
		this.maxDiskQuota = maxDiskQuota;
	}

	public Long getCurrentDiskQuota() {
		return currentDiskQuota;
	}

	public void setCurrentDiskQuota(Long currentDiskQuota) {
		this.currentDiskQuota = currentDiskQuota;
	}

	public Double getCurrentBudget() {
		return currentBudget;
	}

	public void setCurrentBudget(Double currentBudget) {
		this.currentBudget = currentBudget;
	}

	public Double getMinimumRequiredBudget() {
		return minimumRequiredBudget;
	}

	public void setMinimumRequiredBudget(Double minimumRequiredBudget) {
		this.minimumRequiredBudget = minimumRequiredBudget;
	}

	public Long getMaxAllowedAccounts() {
		return maxAllowedAccounts;
	}

	public void setMaxAllowedAccounts(Long maxAllowedAccounts) {
		this.maxAllowedAccounts = maxAllowedAccounts;
	}

	public Long getCurrentDiscountPercent() {
		return currentDiscountPercent;
	}

	public void setCurrentDiscountPercent(Long currentDiscountPercent) {
		this.currentDiscountPercent = currentDiscountPercent;
	}

	@JsonIgnore
	@Transient
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Owner: ").append(getOwner().getUsername()).append("\n");
		builder.append("Logo: ").append(getLogoUrl()).append("\n");
		builder.append("Facebook ID: ").append(getFacebookId()).append("\n");
		builder.append("Twitter ID: ").append(getTwitterId()).append("\n");
		builder.append("Google+ ID: ").append(getGooglePlusId()).append("\n");
		return builder.toString();
	}
}
