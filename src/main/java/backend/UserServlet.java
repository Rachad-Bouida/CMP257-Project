package backend;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import jakarta.servlet.http.HttpSession;

@WebServlet("/api/user")
public class UserServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        
        response.setContentType("application/json");
        
        if (session != null && session.getAttribute("userId") != null) {
            int userId = (int) session.getAttribute("userId");
            String email = (String) session.getAttribute("userEmail");

            response.getWriter().write("{\"userId\":" + userId + ", \"email\":\"" + email + "\", \"isLoggedIn\": true}");
        } else {
            response.getWriter().write("{\"isLoggedIn\": false}");
        }
    }
}