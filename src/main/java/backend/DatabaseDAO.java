	package backend;
	
	import java.sql.*;
	import java.security.MessageDigest;
	import java.util.Arrays;
	import java.util.ArrayList;
	import java.util.List;
	
	public class DatabaseDAO {
	    private static final String URL = "jdbc:mysql://localhost:3306/macrobites_db";
	    private static final String USER = "root";
	    private static final String PASS = "something";
	
	    public static Connection getConnection() throws SQLException, ClassNotFoundException {
	        Class.forName("com.mysql.cj.jdbc.Driver");
	        return DriverManager.getConnection(URL, USER, PASS);
	    }
	
	    public static List<Recipe> getAllRecipes() {
	        List<Recipe> recipes = new ArrayList<>();
	
	        String sql = "SELECT DISTINCT * FROM recipes ORDER BY title ASC";
	
	        try (Connection conn = getConnection();
	             PreparedStatement ps = conn.prepareStatement(sql);
	             ResultSet rs = ps.executeQuery()) 
	        {
	            while (rs.next()) 
	            {
	                Recipe r = new Recipe();
	                r.setId(rs.getInt("recipe_id"));
	                r.setTitle(rs.getString("title"));
	                r.setImg(rs.getString("img_url"));
	                r.setDescription(rs.getString("description"));
	                r.setProtein(rs.getString("protein"));
	                r.setCalories(rs.getString("calories"));
	
	                // Handling list data by splitting strings
	                String rawIngredients = rs.getString("ingredients");
		            String cleanedIngredients = rawIngredients.replaceAll("[\\[\\]\"]", "");
		            r.setIngredients(Arrays.asList(cleanedIngredients.split(",")));
	             
	                String rawInstructions = rs.getString("instructions");
		            String cleanedInstructions = rawInstructions.replaceAll("[\\[\\]\"]", "");
		            r.setInstructions(Arrays.asList(cleanedInstructions.split(",")));
	                
	                recipes.add(r);
	            }
	        } 
	        catch (Exception e) 
	        {
	            e.printStackTrace();
	        }
	        return recipes;
	    }
	    
	    public static boolean registerUser(String email, String password) {
	        String hashedPass = hashPassword(password);
	        String sql = "INSERT INTO users (email, password) VALUES (?, ?)";
	        
	        try (Connection conn = getConnection();
	             PreparedStatement ps = conn.prepareStatement(sql)) 
	        {
	            ps.setString(1, email);
	            ps.setString(2, hashedPass);
	            return ps.executeUpdate() > 0; // Returns true if the user was stored
	        } catch (Exception e) {
	            e.printStackTrace();
	            return false; // Fails if email already exists (unique constraint)
	        }
	    }
	
	    public static boolean validateUser(String email, String password) {
	        String sql = "SELECT * FROM users WHERE email = ? AND password = ?";
	        
	        try (Connection conn = getConnection();
	             PreparedStatement ps = conn.prepareStatement(sql)) {
	            
	            ps.setString(1, email);
	            ps.setString(2, password);
	            
	            try (ResultSet rs = ps.executeQuery()) {
	                return rs.next(); // Returns true if a matching record is found
	            }
	        } catch (Exception e) {
	            e.printStackTrace();
	            return false;
	        }
	    }
	    
	    public static String hashPassword(String password) {
	        try {
	            MessageDigest digest = MessageDigest.getInstance("SHA-256");
	            byte[] hash = digest.digest(password.getBytes("UTF-8"));
	            StringBuilder hexString = new StringBuilder();
	            for (byte b : hash) {
	                String hex = Integer.toHexString(0xff & b);
	                if (hex.length() == 1) hexString.append('0');
	                hexString.append(hex);
	            }
	            return hexString.toString();
	        } catch (Exception ex) { throw new RuntimeException(ex); }
	    }
	
	    // Save Logic: Link recipe to user
	    public static boolean saveRecipe(int userId, int recipeId) {
	        String sql = "INSERT INTO saved_recipes (user_id, recipe_id) VALUES (?, ?)";
	        try (Connection conn = getConnection();
	             PreparedStatement ps = conn.prepareStatement(sql)) 
	        {
	            ps.setInt(1, userId);
	            ps.setInt(2, recipeId);
	            return ps.executeUpdate() > 0;
	        } 
	        catch (Exception e) 
	        { 
	            e.printStackTrace();
	            return false; 
	        }
	    }
	
	    // Helper to get User ID after login
	    public static int getUserId(String email) {
	        String sql = "SELECT user_id FROM users WHERE email = ?";
	        try (Connection conn = getConnection();
	             PreparedStatement ps = conn.prepareStatement(sql)) 
	        {
	            ps.setString(1, email);
	            ResultSet rs = ps.executeQuery();
	            if (rs.next()) return rs.getInt("user_id");
	        } 
	        catch (Exception e) { e.printStackTrace(); }
	        return -1;
	    }
	    public static boolean removeSavedRecipe(int userId, int recipeId) {
	        String sql = "DELETE FROM saved_recipes WHERE user_id = ? AND recipe_id = ?";
	        
	        try (Connection conn = getConnection();
	             PreparedStatement ps = conn.prepareStatement(sql)) {
	            
	            ps.setInt(1, userId);
	            ps.setInt(2, recipeId);
	            
	            return ps.executeUpdate() > 0;
	            
	        } catch (Exception e) {
	            e.printStackTrace();
	            return false;
	        }
	    }
	    public static List<Recipe> getSavedRecipes(int userId) {
	        List<Recipe> recipes = new ArrayList<>();
	
	        String sql = "SELECT r.* FROM recipes r " + "JOIN saved_recipes sr ON r.recipe_id = sr.recipe_id " + "WHERE sr.user_id = ?";
	
	        try (Connection conn = getConnection();
	             PreparedStatement ps = conn.prepareStatement(sql)) 
	        {
	            ps.setInt(1, userId);
	            try (ResultSet rs = ps.executeQuery()) 
	            {
	                while (rs.next()) 
	                {
	                    Recipe r = new Recipe();
	                    r.setId(rs.getInt("recipe_id"));
	                    r.setTitle(rs.getString("title"));
	                    r.setImg(rs.getString("img_url"));
	                    r.setDescription(rs.getString("description"));
	                    r.setProtein(rs.getString("protein"));
	                    r.setCalories(rs.getString("calories"));

	                    
	                 // Handling list data by splitting strings
		                String rawIngredients = rs.getString("ingredients");
			            String cleanedIngredients = rawIngredients.replaceAll("[\\[\\]\"]", "");
			            r.setIngredients(Arrays.asList(cleanedIngredients.split(",")));
		             
		                String rawInstructions = rs.getString("instructions");
			            String cleanedInstructions = rawInstructions.replaceAll("[\\[\\]\"]", "");
			            r.setInstructions(Arrays.asList(cleanedInstructions.split(",")));
	                    recipes.add(r);
	                }
	            }
	        } 
	        catch (Exception e) { e.printStackTrace(); }
	        return recipes;
	    }
	public static boolean insertRecipe(Recipe r) {
	    String sql = "INSERT INTO recipes (title, img_url, description, protein, calories, ingredients, instructions) VALUES (?, ?, ?, ?, ?, ?, ?)";
	
	    try (Connection conn = getConnection();
	         PreparedStatement ps = conn.prepareStatement(sql)) {
	
	        ps.setString(1, r.getTitle());
	        ps.setString(2, r.getImg());
	        ps.setString(3, r.getDescription());
	        ps.setString(4, r.getProtein());
	        ps.setString(5, r.getCalories());
	
	        // Convert List → String
	        ps.setString(6, String.join(",", r.getIngredients()));
	        ps.setString(7, String.join(",", r.getInstructions()));
	
	        return ps.executeUpdate() > 0;
	
	    } catch (Exception e) {
	        e.printStackTrace();
	        return false;
	    }
	}
	public static boolean updateRecipe(Recipe r) {
	    String sql = "UPDATE recipes SET title=?, img_url=?, description=?, protein=?, calories=?, ingredients=?, instructions=? WHERE recipe_id=?";
	
	    try (Connection conn = getConnection();
	         PreparedStatement ps = conn.prepareStatement(sql)) {
	
	        ps.setString(1, r.getTitle());
	        ps.setString(2, r.getImg());
	        ps.setString(3, r.getDescription());
	        ps.setString(4, r.getProtein());
	        ps.setString(5, r.getCalories());
	        ps.setString(6, String.join(",", r.getIngredients()));
	        ps.setString(7, String.join(",", r.getInstructions()));
	        ps.setInt(8, r.getId());
	
	        return ps.executeUpdate() > 0;
	
	    } catch (Exception e) {
	        e.printStackTrace();
	        return false;
	    }
	}
	public static boolean isAdmin(String email) {
	    String sql = "SELECT is_admin FROM users WHERE email=?";
	    try (Connection conn = getConnection();
	         PreparedStatement ps = conn.prepareStatement(sql)) {
	        
	        ps.setString(1, email);
	        ResultSet rs = ps.executeQuery();
	        
	        if (rs.next()) {
	            return rs.getBoolean("is_admin");
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	    }
	    return false;
	}
	}
