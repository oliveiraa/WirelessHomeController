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
import com.rapplogic.xbee.api.XBeeTimeoutException;

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
			JSONObject json = data[0];
			System.out.println(json.toString());
			int[] valor = new int[1];
			try {
				valor[0] = json.getInt("valor");
				ConfiguraPorta(json.getString("porta"), valor, new XBeeAddress64(json.getString("address")));
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
	
	public void LerEntrada(){
		try {
			JSONObject json = new JSONObject("{entrada: 'D0', valor: '100'}");
			socket.emit("EntradaLida", json);
		} catch (JSONException e) {
			System.out.println("Nao foi possivel construir objeto JSON para leitura de entrada");
		} catch (IOException e) {
			System.out.println("Nao foi possivel enviar evento EntradaLida para servidor");
		}
	}
	
	
	//Comunicacao com Xbee
	XBee xbee;
	private void InicializaXbee(){
		try {
			xbee = new XBee();
			xbee.open("/dev/tty", 9600);
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