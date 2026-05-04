package backend;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import jakarta.servlet.http.HttpSession;

@WebServlet("/api/login")
public class LoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String email = request.getParameter("email");
        String pass = DatabaseDAO.hashPassword(request.getParameter("password"));

        if (DatabaseDAO.validateUser(email, pass)) 
        {
        	int userId = DatabaseDAO.getUserId(email);
            HttpSession session = request.getSession();
            session.setAttribute("userId", userId);
            session.setAttribute("userEmail", email);

            response.setStatus(HttpServletResponse.SC_OK);
        } 
        else 
        {
            response.setStatus(401);
            response.setContentType("application/json");
            response.getWriter().write("{\"status\":\"fail\"}");
        }
    }
}
