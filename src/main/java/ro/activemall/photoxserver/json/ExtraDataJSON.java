package ro.activemall.photoxserver.json;

public class ExtraDataJSON {

	public Double width;
	public Double height;

	public String toJsonString(){
		return "{\"width\":"+width+",\"height\":"+height+"}";
	}
}
