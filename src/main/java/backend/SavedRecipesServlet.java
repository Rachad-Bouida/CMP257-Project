package backend;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import jakarta.servlet.http.HttpSession;

@WebServlet("/api/saved-recipes")
public class SavedRecipesServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        
        if (session == null || session.getAttribute("userId") == null) 
        {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED); // Block unauthorized access
            return;
        }

        int userId = (int) session.getAttribute("userId");
        List<Recipe> saved = DatabaseDAO.getSavedRecipes(userId);

        response.setContentType("application/json");
        StringBuilder json = new StringBuilder("[");
        for (int i = 0; i < saved.size(); i++) {
            Recipe r = saved.get(i);
            json.append("{");
            json.append("\"id\":").append(r.getId()).append(",");
            json.append("\"title\":\"").append(r.getTitle()).append("\",");
            json.append("\"img\":\"").append(r.getImg()).append("\","); 
            json.append("\"description\":\"").append(r.getDescription()).append("\","); 
            json.append("\"protein\":\"").append(r.getProtein()).append("\",");
            json.append("\"calories\":\"").append(r.getCalories()).append("\",");
            
            // Ingredients Array
            json.append("\"ingredients\":[");
            for (int j = 0; j < r.getIngredients().size(); j++) {
                json.append("\"").append(r.getIngredients().get(j).replace("\"", "\\\"").trim()).append("\"");
                if (j < r.getIngredients().size() - 1) json.append(",");
            }
            json.append("],");
            
            // Instructions Array
            json.append("\"instructions\":[");
            for (int j = 0; j < r.getInstructions().size(); j++) {
                json.append("\"").append(r.getInstructions().get(j).replace("\"", "\\\"").trim()).append("\"");
                if (j < r.getInstructions().size() - 1) json.append(",");
            }
            json.append("]");
            
            json.append("}");
            if (i < saved.size() - 1) json.append(",");
        }
        json.append("]");
        response.getWriter().write(json.toString());
    }
}