package backend;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.io.IOException;
import jakarta.servlet.http.*;

@WebServlet("/api/editRecipe")
public class EditRecipeServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    	 HttpSession session = request.getSession();
    	    String email = (String) session.getAttribute("userEmail");

    	    if (email == null || !DatabaseDAO.isAdmin(email)) 
    	    {
    	        response.sendError(403);
    	        return;
    	    }
        Recipe r = new Recipe();

        r.setId(Integer.parseInt(request.getParameter("id")));
        r.setTitle(request.getParameter("title"));
        r.setImg(request.getParameter("img"));
        r.setDescription(request.getParameter("description"));
        r.setProtein(request.getParameter("protein"));
        r.setCalories(request.getParameter("calories"));

        r.setIngredients(Arrays.asList(request.getParameter("ingredients").split(",")));
        r.setInstructions(Arrays.asList(request.getParameter("instructions").split(",")));

        boolean success = DatabaseDAO.updateRecipe(r);

        response.getWriter().write(success ? "UPDATED" : "FAIL");
    }
}