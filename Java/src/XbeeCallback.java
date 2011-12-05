import java.io.IOException;

import org.json.JSONException;
import org.json.JSONObject;

import com.clwillingham.socket.io.IOSocket;
import com.clwillingham.socket.io.MessageCallback;
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

public class XbeeCallback implements MessageCallback {

	IOSocket socket;
	
	@Override
	public void on(String event, JSONObject... data) {
		if(event.equalsIgnoreCase("BridgeEnviaDados")){
			EnviaMensagemSensor(data);
		}
	}

	@Override
	public void onMessage(String message) {

	}

	@Override
	public void onMessage(JSONObject json) {
		
	}

	@Override
	public void onConnect() {
		System.out.println("Conectado com sucesso!");
		InicializaXbee();
	}

	@Override
	public void onDisconnect() {
		System.out.println("Desconectado com sucesso");
		DesconectaXbee();
	}

	@Override
	public void onConnectFailure() {
		System.out.println("Falha na conexao");
	}

	public void setSocket(IOSocket socket) {
		this.socket = socket;
	}
	
	public void connect(){
		try {
			socket.connect();
		} catch (IOException e) {
			System.out.println("Erro ao conectar Socket: " + e.getMessage());
		}
	}
	
	private void EnviaMensagemSensor(JSONObject[] data) {
		if(data.length > 0){
			int[] valor = new int[1];
			try {
				JSONObject json = data[0].getJSONObject("data");
				String comando = json.getString("comando");
				if(comando.equalsIgnoreCase("AlteraValorDigital")) {
					valor[0] = json.getInt("valor");
					ConfiguraPorta(json.getString("porta"), valor, new XBeeAddress64(json.getString("endereco")));					
				} else if(comando.equalsIgnoreCase("LerValorDigital")) {
					LerEntradaDigital(json);
				} else if(comando.equalsIgnoreCase("LerValorAnalogico")) {
					LerEntradaAnalogica(json);
				}
			} catch (XBeeTimeoutException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (XBeeException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	public void LerEntradaDigital(JSONObject json){
		try {
			XBeeAddress64 address = new XBeeAddress64(json.getString("endereco"));
			String porta = json.getString("porta");
			int pin = Integer.parseInt(porta.substring(1));
			XBeeRequest request = new ZBForceSampleRequest(address);
			XBeeResponse response = xbee.sendSynchronous(request,6000);
			RemoteAtResponse remoteAt = (RemoteAtResponse)response;
			if(remoteAt.isOk()) {
				ZNetRxIoSampleResponse ioSample = ZNetRxIoSampleResponse.parseIsSample(remoteAt);
				socket.emit("BridgeRecebeDados", new JSONObject("{comando: LeituraDigital, valor: " + ioSample.isDigitalOn(pin) + ", id:" + json.getString("id") + "}"));
			}
			
		} catch (JSONException e) {
			System.out.println("Nao foi possivel construir objeto JSON para leitura de entrada");
		} catch (IOException e) {
			System.out.println("Nao foi possivel enviar evento EntradaLida para servidor");
		} catch (XBeeTimeoutException e) {
			e.printStackTrace();
		} catch (XBeeException e) {
			e.printStackTrace();
		}
	}
	
	public void LerEntradaAnalogica(JSONObject json){
		try {
			XBeeAddress64 address = new XBeeAddress64(json.getString("endereco"));
			String porta = json.getString("porta");
			int pin = Integer.parseInt(porta.substring(1));
			XBeeRequest request = new ZBForceSampleRequest(address);
			XBeeResponse response = xbee.sendSynchronous(request,6000);
			RemoteAtResponse remoteAt = (RemoteAtResponse)response;
			if(remoteAt.isOk()) {
				ZNetRxIoSampleResponse ioSample = ZNetRxIoSampleResponse.parseIsSample(remoteAt);
				socket.emit("BridgeRecebeDados", new JSONObject("{comando: LeituraAnalogica, valor: " + ioSample.getAnalog(pin) + ", id:" + json.getString("id") + "}"));
			}
		} catch (JSONException e) {
			System.out.println("Nao foi possivel construir objeto JSON para leitura de entrada");
		} catch (IOException e) {
			System.out.println("Nao foi possivel enviar evento EntradaLida para servidor");
		} catch (XBeeTimeoutException e) {
			e.printStackTrace();
		} catch (XBeeException e) {
			e.printStackTrace();
		}
	}
	
	
	//Comunicacao com Xbee
	XBee xbee;
	private void InicializaXbee(){
		try {
			xbee = new XBee();
			xbee.open("/dev/ttyUSB0", 9600);
		} catch (XBeeException e) {
			e.printStackTrace();
		}
	}
	
	private void DesconectaXbee(){
		if(xbee.isConnected())
			xbee.close();
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