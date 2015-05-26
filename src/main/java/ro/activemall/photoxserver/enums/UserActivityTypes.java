package ro.activemall.photoxserver.enums;

/**
 * 
 * @author Badu
 * 
 *         For auditing user actions - WIP
 */
public enum UserActivityTypes {
	TEST(-1), LOGIN(0), LOGOUT(1), DOWNLOAD_FILE(2), REGISTER(3), CHANGED_PASSWORD(4), NEWSLETTER(5), FORGOT_PASSWORD(6);
	
	private int type;

	private UserActivityTypes(int defType) {
		type = defType;
	}

	public int getIntValue() {
		return type;
	}

	public static String toString(int ofType) {
		switch (ofType) {
		case -1:
			return "TEST";
		case 0:
			return "LOGIN";
		case 1:
			return "LOGOUT";
		case 2:
			return "DOWNLOAD";
		case 3: 
			return "REGISTER";
		case 4:
			return "CHANGED_PASSWORD";
		case 5:
			return "NEWSLETTER";
		case 6:
			return "FORGOT_PASSWORD";
		}
		return "UNKNOWN";

	}
}
