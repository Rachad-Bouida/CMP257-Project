package backend;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/api/recipes")
public class RecipeServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {

        List<Recipe> recipes = DatabaseDAO.getAllRecipes();
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        StringBuilder json = new StringBuilder();
        json.append("["); 

        for (int i = 0; i < recipes.size(); i++) 
        {
            Recipe r = recipes.get(i);
            json.append("{");
            json.append("\"id\":").append(r.getId()).append(",");
            json.append("\"title\":\"").append(r.getTitle()).append("\",");
            json.append("\"img\":\"").append(r.getImg()).append("\","); 
            json.append("\"description\":\"").append(r.getDescription()).append("\","); 
            json.append("\"protein\":\"").append(r.getProtein()).append("\",");
            json.append("\"calories\":\"").append(r.getCalories()).append("\",");
            //Ingredients Array
            json.append("\"ingredients\":[");
            for (int j = 0; j < r.getIngredients().size(); j++) 
            {
                json.append("\"").append(r.getIngredients().get(j).replace("\"", "\\\"").trim()).append("\"");
                if (j < r.getIngredients().size() - 1) json.append(",");
            }
            json.append("],");

            //Instructions Array
            json.append("\"instructions\":[");
            for (int j = 0; j < r.getInstructions().size(); j++) 
            {
                json.append("\"").append(r.getInstructions().get(j).replace("\"", "\\\"").trim()).append("\"");
                if (j < r.getInstructions().size() - 1) json.append(",");
            }
            json.append("]");

            json.append("}");
            if (i < recipes.size() - 1) json.append(","); 
        }

        json.append("]"); 
        response.getWriter().write(json.toString());
    }
}