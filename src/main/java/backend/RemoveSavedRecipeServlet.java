package backend;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import java.io.IOException;

@WebServlet("/api/removeSaved")
public class RemoveSavedRecipeServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        HttpSession session = request.getSession(false);

        if (session == null || session.getAttribute("userId") == null) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        int userId = (int) session.getAttribute("userId");
        int recipeId = Integer.parseInt(request.getParameter("recipeId"));

        boolean success = DatabaseDAO.removeSavedRecipe(userId, recipeId);

        if (success) {
            response.getWriter().write("{\"message\":\"Removed successfully\"}");
        } else {
            response.setStatus(400);
            response.getWriter().write("{\"message\":\"Failed to remove\"}");
        }	
    }
}