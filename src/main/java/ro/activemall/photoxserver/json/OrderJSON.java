package ro.activemall.photoxserver.json;

import java.util.Set;

public class OrderJSON {
	
	public Long orderId;
	
	public Long productId;
	
	public Set<SelectorIdJSON> selectedSelectorsIds;
	
	public class SelectorIdJSON{
	
		public Long materialId;
		
		public int selectorSequence;
	
	}
}
