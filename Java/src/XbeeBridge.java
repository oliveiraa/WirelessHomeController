import com.rapplogic.xbee.api.RemoteAtRequest;
import com.rapplogic.xbee.api.RemoteAtResponse;
import com.rapplogic.xbee.api.XBee;
import com.rapplogic.xbee.api.XBeeAddress64;
import com.rapplogic.xbee.api.XBeeException;
import com.rapplogic.xbee.api.XBeeRequest;
import com.rapplogic.xbee.api.XBeeResponse;
import com.rapplogic.xbee.api.XBeeTimeoutException;
import com.rapplogic.xbee.api.zigbee.ZBForceSampleRequest;
import com.rapplogic.xbee.api.zigbee.ZNetRxIoSampleResponse;

public class XbeeBridge {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		String comando = "";
		Boolean valor = false;
		XbeeBridge bridge = new XbeeBridge();
		for(int i = 0; i < args.length; i = i + 2){
			if(args[i] != null && args[i+1] != null)
			{
				comando = args[i];
				valor = args[i+1].equalsIgnoreCase("1");
				bridge.LuzSala(valor);
			}
		}
		
		bridge.Close();
	}
	
	XBee xbee;
	XBeeAddress64 addressSala;
	
	public XbeeBridge(){
		try {
			Configurar();
		} catch (XBeeException e) {
			System.out.println("0 - Erro executar configuracao inicial " + e.getMessage());
		} catch (InterruptedException e) {
			System.out.println("0 - Erro executar configuracao inicial " + e.getMessage());
		}
	}
	
	public void Configurar() throws XBeeException, InterruptedException{
		xbee = new XBee();
		xbee.open("/dev/ttyUSB0", 9600);
		addressSala = new XBeeAddress64(0, 0x13, 0xa2, 0, 0x40, 0x6f, 0xb7, 0xac);
	}
	
	public void Close(){
		xbee.close();
	}
	
	
	public void LuzSala(Boolean liga)
	{
		try {
			if(liga)
				ConfiguraPorta("D3", new int[] {5}, addressSala);
			else
				ConfiguraPorta("D3", new int[] {4}, addressSala);
		} catch (XBeeTimeoutException e) {
			System.out.println("0 - Erro ao executar comando LuzSala " + e.getMessage());
		} catch (XBeeException e) {
			System.out.println("0 - Erro ao executar comando LuzSala " + e.getMessage());	
		}
	}
	
	private void ConfiguraPorta(String port, int[] valor, XBeeAddress64 address) throws XBeeTimeoutException, XBeeException{
		RemoteAtRequest changeRequest = new RemoteAtRequest(address, port, valor);
		RemoteAtResponse changeResponse = (RemoteAtResponse) xbee.sendSynchronous(changeRequest, 10000);
		if (changeResponse.isOk()) 
			System.out.println("1 - Porta " + port + " alterada com sucesso");
		else
			System.out.println("0 - Porta " + port + " nao foi alterada");
	}
}
