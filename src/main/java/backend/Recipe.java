package backend;

import java.util.List;

public class Recipe {
    private int id;
    private String title;
    private String img;
    private String description;
    private String protein;
    private String calories;
    private List<String> ingredients;
    private List<String> instructions;
    
    public Recipe() {}

    public Recipe(int id, String title, String img, String description, 
                  String protein, String calories, List<String> ingredients, 
                  List<String> instructions) 
    {
        this.id = id;
        this.title = title;
        this.img = img;
        this.description = description;
        this.protein = protein;
        this.calories = calories;
        this.ingredients = ingredients;
        this.instructions = instructions;
    }

    public int getId() 
    {
        return id;
    }

    public void setId(int id) 
    {
        this.id = id;
    }

    public String getTitle() 
    {
        return title;
    }

    public void setTitle(String title) 
    {
        this.title = title;
    }

    public String getImg() 
    {
        return img;
    }

    public void setImg(String img) 
    {
        this.img = img;
    }

    public String getDescription() 
    {
        return description;
    }

    public void setDescription(String description) 
    {
        this.description = description;
    }

    public String getProtein() 
    {
        return protein;
    }

    public void setProtein(String protein) 
    {
        this.protein = protein;
    }

    public String getCalories() 
    {
        return calories;
    }

    public void setCalories(String calories) 
    {
        this.calories = calories;
    }

    public List<String> getIngredients() 
    {
        return ingredients;
    }

    public void setIngredients(List<String> ingredients) 
    {
        this.ingredients = ingredients;
    }

    public List<String> getInstructions() 
    {
        return instructions;
    }

    public void setInstructions(List<String> instructions) 
    {
        this.instructions = instructions;
    }
}