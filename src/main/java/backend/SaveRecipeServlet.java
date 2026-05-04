package backend;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/api/save")
public class SaveRecipeServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Integer userId = (Integer) request.getSession().getAttribute("userId");
        int recipeId = Integer.parseInt(request.getParameter("recipeId"));

        if (userId != null && DatabaseDAO.saveRecipe(userId, recipeId)) 
        {
            response.getWriter().write("{\"message\":\"Recipe saved!\"}");
        } 
        else 
        {
            response.setStatus(400);
            response.setContentType("application/json");
            response.getWriter().write("{\"message\":\"Login required or already saved.\"}");
        }
    }
}