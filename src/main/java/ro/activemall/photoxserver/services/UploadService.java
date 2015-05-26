package ro.activemall.photoxserver.services;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Base64;

import javax.annotation.PostConstruct;
import javax.imageio.ImageIO;

import org.apache.commons.io.FilenameUtils;
import org.apache.log4j.Logger;
import org.imgscalr.Scalr;
import org.imgscalr.Scalr.Method;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MultipartFile;

import ro.activemall.photoxserver.entities.Resource;
import ro.activemall.photoxserver.entities.ResourceTag;
import ro.activemall.photoxserver.entities.User;
import ro.activemall.photoxserver.enums.ResourcesTypes;
import ro.activemall.photoxserver.enums.UserActivityTypes;
import ro.activemall.photoxserver.events.UserActionEvent;
import ro.activemall.photoxserver.exceptions.PhotoxException;
import ro.activemall.photoxserver.repositories.ResourcesRepository;

@Service
public class UploadService extends ApplicationAbstractService {
	public static String[] supportedResourcesUploads = new String[] { "png",
			"jpg", "jpeg", "mpeg", "mp4", "flv", "mp3", "pdf", "doc", "ppt",
			"docx", "pptx" };

	private static Logger log = Logger.getLogger(UploadService.class);

	String imagesStorageFolderName;

	String resourcesFolderStorage;

	// @Autowired
	// private Environment env;

	@Autowired
	ResourcesRepository resourcesRepo;

	@PostConstruct
	public void setup() {
		// imagesStorageFolderName = env.getProperty("imagesStorageFolderName");
		// resourcesFolderStorage =
		// env.getProperty("resourcesStorageFolderName");
		// log.info("UploadService---");
		// log.info(imagesStorageFolderName);
		// Test, to see if the localization works
		log.info(getLocalizedMessage("info.upload.service.started", null));
	}	

	private File transferFile(MultipartFile file, String destFilePath)
			throws IllegalStateException, IOException {
		File f = new File(destFilePath);
		file.transferTo(f);
		return f;
	}

	public String imageUpload(MultipartFile file, User authenticatedUser) {
		// log.info("User " +authenticatedUser.getUsername()+
		// " is uploading "+file.getName());
		String result = "ERR|";
		if (file == null || file.isEmpty()) {
			log.error("Uploaded empty file");
			throw new PhotoxException(getLocalizedMessage(
					"error.uploadedfile.empty", authenticatedUser));
		}
		// verify file type
		String fileExtension = FilenameUtils.getExtension(
				file.getOriginalFilename().toLowerCase()).toLowerCase();
		if (!Arrays.asList(supportedResourcesUploads).contains(fileExtension)) {
			log.error("Uploaded file with bad extension");
			throw new PhotoxException(
					getLocalizedMessage("error.uploadedfile.notsupported",
							new Object[] { Arrays
									.toString(supportedResourcesUploads) },
							authenticatedUser));
		}
		// last, transfering the file into it's position
		try {
			new File(new File("").getAbsolutePath() + File.separator + "static"
					+ File.separator + imagesStorageFolderName).mkdirs();
			transferFile(
					file,
					new File("").getAbsolutePath()
							+ File.separator
							+ "static"
							+ File.separator
							+ imagesStorageFolderName
							+ File.separator
							+ FilenameUtils.getName(file.getOriginalFilename()
									.toLowerCase()));

			result = File.separator
					+ imagesStorageFolderName
					+ File.separator
					+ FilenameUtils.getName(file.getOriginalFilename()
							.toLowerCase());
			// log.info("File uploaded to "+result);
			/**
			 * BufferedImage originalImage = ImageIO.read(uploadFile);
			 * BufferedImage resizedImage = scaleImage(originalImage,
			 * photoWidth, photoHeight);
			 * 
			 * File photoFile = new File(photoDir, contactId + "." +
			 * fileExtension); ImageIO.write(resizedImage, fileExtension,
			 * photoFile);
			 */
			return result;

		} catch (IOException io) {
			// TODO : move this to errors
			log.error("Error", io);
			throw new PhotoxException(io.getMessage());
		}
	}
	

	public Resource resourceUpload(MultipartFile file, Long attachToResourceId,
			User authenticatedUser, Resource resource) {
		Resource associatedResource = new Resource();
		if (file == null || file.isEmpty()) {
			log.error("Uploaded empty file ???");
			throw new PhotoxException(getLocalizedMessage(
					"error.uploadedfile.empty", authenticatedUser));
		}
		// verify file type
		String fileExtension = FilenameUtils.getExtension(
				file.getOriginalFilename().toLowerCase()).toLowerCase();
		if (!Arrays.asList(supportedResourcesUploads).contains(fileExtension)) {
			log.error("Uploaded file with bad extension");
			throw new PhotoxException(
					getLocalizedMessage("error.uploadedfile.notsupported",
							new Object[] { Arrays
									.toString(supportedResourcesUploads) },
							authenticatedUser));
		}
		Resource parentResource = resourcesRepo.findOne(attachToResourceId);
		if (parentResource != null) {
			// log.info("Parent resource found : "+parentResource.getTitle());
			associatedResource.setParent(parentResource);
		} else {
			throw new PhotoxException(getLocalizedMessage(
					"error.uploadedfile.empty", authenticatedUser));
		}
		// last, transfering the file into it's position
		try {
			new File(new File("").getAbsolutePath() + File.separator + "static"
					+ File.separator + resourcesFolderStorage).mkdirs();
			transferFile(
					file,
					new File("").getAbsolutePath()
							+ File.separator
							+ "static"
							+ File.separator
							+ resourcesFolderStorage
							+ File.separator
							+ FilenameUtils.getName(file.getOriginalFilename()
									.toLowerCase()));

			String result = File.separator
					+ resourcesFolderStorage
					+ File.separator
					+ FilenameUtils.getName(file.getOriginalFilename()
							.toLowerCase());

			if (resource != null) {
				if (resource.getId() != null
						&& resource.getId().compareTo(0L) != 0) {
					associatedResource.setId(resource.getId());
				}
				if (resource.getTitle() != null) {
					associatedResource.setTitle(resource.getTitle());
				} else {
					associatedResource.setTitle("");
				}
				if (resource.getDescription() != null) {
					associatedResource
							.setDescription(resource.getDescription());
				}
				if (resource.getTags() != null) {
					log.info("We have tags!");
					for (ResourceTag tag : resource.getTags()) {
						log.info(tag.getTag().getName());
					}
				}
			} else {
				log.error("Resource is NULL");
			}

			associatedResource.setSequence(parentResource.getChildren().size());
			associatedResource.setType(ResourcesTypes.FILE.getIntValue());
			associatedResource.setOwner(authenticatedUser);
			associatedResource.setContentType(file.getContentType());
			associatedResource.setExtra(result);
			// save
			resourcesRepo.save(associatedResource);
			// log.info("File uploaded to "+result+". resource saved");
			// log.info(associatedResource.toString());

		} catch (Exception io) {
			// TODO : move this to errors
			log.error("Error", io);
			throw new PhotoxException(io.getMessage());
		}
		return associatedResource;
	}
	
	public HttpEntity<byte[]> testUpload(MultipartFile file, User authenticatedUser){
		String fileExtension = FilenameUtils.getExtension(
				file.getOriginalFilename().toLowerCase()).toLowerCase();
		if (!Arrays.asList(supportedResourcesUploads).contains(fileExtension)) {
			log.error("Uploaded file with bad extension");
			throw new PhotoxException(
					getLocalizedMessage("error.uploadedfile.notsupported",
							new Object[] { Arrays
									.toString(supportedResourcesUploads) },
							authenticatedUser));
		}
		String name = file.getOriginalFilename();
		
		BufferedImage image = null;
		BufferedImage result = null;
		byte[] resourceContent = null;
		ByteArrayOutputStream baos = null;
		try {
			image = ImageIO.read(file.getInputStream());
			result = Scalr.resize(image, Method.ULTRA_QUALITY, 1024);		
			
			File outputFile = new File(new File("").getAbsolutePath()
			+ File.separator
			+ "static"
			+ File.separator + name);
			
			ImageIO.write(result, "jpg", new FileOutputStream(outputFile));
			baos = new ByteArrayOutputStream();
			ImageIO.write( result, "jpg", baos );
			baos.flush();
			resourceContent = baos.toByteArray();	
			baos.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.IMAGE_JPEG);
		headers.setContentLength(resourceContent.length);
		headers.setLastModified(new DateTime().now().getMillis());
		
		log.info(file.getOriginalFilename()+ " was uploaded (and converted) "+file.getName()+ " bytes "+file.getSize() + " into "+resourceContent.length+" bytes");
		// we're sure now that the file was delivered
		return new HttpEntity<byte[]>(Base64.getEncoder().encode(resourceContent), headers);
	}

	public HttpEntity<byte[]> getPhisicalResource(String resourceFileName,
			WebRequest request, User authenticatedUser) throws IOException {
		// TODO : set content type according to file type
		// TODO : identify the resource and check if current user is allowed to
		// take it
		// log.info("REQ : "+resourceFileName);
		File resourceFile = new File(new File("").getAbsolutePath()
				+ File.separator + "static" + File.separator
				+ resourcesFolderStorage, resourceFileName);
		if (!resourceFile.exists()) {
			return null;
			// resourceFile = new File(resourcesFolderStorage,
			// "DEFAULT_PHOTO.jpg");
		}
		if (request.checkNotModified(resourceFile.lastModified())) {
			return null; // return 304 code
		}
		// load the whole file into a byte before sending the response
		byte[] resourceContent = Files.readAllBytes(Paths.get(resourceFile
				.getPath()));

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.IMAGE_JPEG);
		headers.setContentLength(resourceContent.length);
		headers.setLastModified(resourceFile.lastModified());
		// log user's download activity
		UserActionEvent event = new UserActionEvent(authenticatedUser,
				UserActivityTypes.DOWNLOAD_FILE.getIntValue(), resourceFileName);
		publisher.publishEvent(event);
		// we're sure now that the file was delivered
		return new HttpEntity<byte[]>(resourceContent, headers);
	}
}