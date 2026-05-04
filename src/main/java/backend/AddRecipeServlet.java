package backend;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import jakarta.servlet.*;
import java.io.IOException;
import java.util.Arrays;

@WebServlet("/api/addRecipe")
public class AddRecipeServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    	 HttpSession session = request.getSession();
    	    String email = (String) session.getAttribute("userEmail");

    	    if (email == null || !DatabaseDAO.isAdmin(email)) {
    	        response.sendError(403);
    	        return;
    	    }
        Recipe r = new Recipe();

        r.setTitle(request.getParameter("title"));
        r.setImg(request.getParameter("img"));
        r.setDescription(request.getParameter("description"));
        r.setProtein(request.getParameter("protein"));
        r.setCalories(request.getParameter("calories"));

        r.setIngredients(Arrays.asList(request.getParameter("ingredients").split(",")));
        r.setInstructions(Arrays.asList(request.getParameter("instructions").split(",")));

        boolean success = DatabaseDAO.insertRecipe(r);

        response.getWriter().write(success ? "SUCCESS" : "FAIL");
    }
}