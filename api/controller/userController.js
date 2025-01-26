import Template from "../model/templateModel.js";
import User from "../model/user.js";

export const myTemplate = async (req, res) => {
  const userId = req.auth.userId;
  try {
    // Find the user and populate the templates
    const userTemplates = await User.findOne({ userId: userId })
      .populate("templates") // Populate the templates array with Template documents
      .exec();

    if (!userTemplates) {
      res.json({ templates: [] });
    } else {
      res.json(userTemplates); // Send the user with populated templates
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
    console.error(err);
  }
};
export const deleteTemplate = async (req, res) => {
  const userId = req.auth.userId;
  const id = req.params.id;
  try {
    // Find the user and populate the templates
    const user = await User.findOne({ userId: userId })
    const templateIndex = user.templates.findIndex(
      (template) => template.toString() === id
    );

    if (templateIndex === -1) {
      return res.status(404).json({ message: "Template not found for this user" });
    }

    // Remove the template from the user's templates array
    user.templates.splice(templateIndex, 1);
    await user.save();

    // Optional: Delete the template from the Template collection
    await Template.findByIdAndDelete(id);

    return res.status(200).json({ message: "Template deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
    console.error(err);
  }
};
