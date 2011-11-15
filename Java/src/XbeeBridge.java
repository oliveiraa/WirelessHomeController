
import com.clwillingham.socket.io.IOSocket;

public class XbeeBridge {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		XbeeCallback callback = new XbeeCallback();
		IOSocket socket = new IOSocket("http://localhost:3000",callback);
		callback.setSocket(socket);
		callback.connect();
	}
}
