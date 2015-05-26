package ro.activemall.photoxserver.services;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Service;

import ro.activemall.photoxserver.entities.UserExtra;
import ro.activemall.photoxserver.enums.UserActivityTypes;
import ro.activemall.photoxserver.events.UserActionEvent;
import ro.activemall.photoxserver.repositories.PlatformSettingsRepository;
import ro.activemall.photoxserver.repositories.UsersExtraRepository;

@Service
public class UsersExtraService implements ApplicationListener<UserActionEvent> {
	
	private static Logger log = Logger.getLogger(UsersExtraService.class);
	
	@Autowired
	UsersExtraRepository repository;
	
	@Autowired
	PlatformSettingsRepository settingsRepository;
	
	public UserExtra getExtraDataByOwnerId(Long ownerId){
		return repository.getExtraDataByOwnerId(ownerId);	
	}
	
	@Override
	public void onApplicationEvent(UserActionEvent event) {
		if (event.getType() == UserActivityTypes.REGISTER.getIntValue()){
			log.info("Username "+event.getUser().getUsername()+" just registered having id #"+event.getUser().getId()+". Creating his extra");
			UserExtra extra = new UserExtra();
			extra.setOwner(event.getUser());			
			extra.setMaxDiskQuota(Long.valueOf(settingsRepository.getPropertyByName("applicationDiskQuota").getValue()));
			extra.setMinimumRequiredBudget(Double.valueOf(settingsRepository.getPropertyByName("applicationMinimumRequiredBudget").getValue()));
			extra.setCurrentDiscountPercent(Long.valueOf(settingsRepository.getPropertyByName("applicationDefaultDiscount").getValue()));
			repository.save(extra);
		}		
	}
}
