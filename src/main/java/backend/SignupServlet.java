package backend;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Servlet implementation class SignupServlet
 */
@WebServlet("/api/signup") // This MUST match the JavaScript fetch exactly
public class SignupServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String email = request.getParameter("email");
		String password = request.getParameter("password");

		// Attempt to register the user via the DAO
		boolean isRegistered = DatabaseDAO.registerUser(email, password);

		if (isRegistered) {
			response.setStatus(HttpServletResponse.SC_OK); // Sends 200 back to JS
		} else {
			// Sends 400 (Bad Request) if email exists or DB fails
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST); 
		}
	}
}