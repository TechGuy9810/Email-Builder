import path from 'path';
import { fileURLToPath } from 'url';
import uploadFile from '../utils/cloudinary.js';
import Template from '../model/templateModel.js';
import User from '../model/user.js';
import ejs from 'ejs';
import fs from 'fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createEmailLayout = async (req, res) => {
  const userId = req.auth.userId;
  try {
    // Create a new template
    const newTemplate = await Template.create({ userId: userId });
  
    // Save the new template (optional, `create` already saves it)
    await newTemplate.save();
  
    // Update an existing user to add the template reference
    let user = await User.findOneAndUpdate(
      { userId: userId },
      { $push: { templates: newTemplate._id } },
      { new: true } // Return the updated user document
    );
  
    // If the user doesn't exist, create a new user
    if (!user) {
      user = await User.create({ userId: userId, templates: [newTemplate._id] });
    }
  
    // Respond with the new template
    res.json({ newTemplate });
  }catch(err)
{
  res.status(500).json({error:"Internal server error"});
  console.log(err);
}
}
export const getEmailLayout = async (req, res) => {
  const userId = req.auth.userId;
  const id = req.params.id;
  try{
    const data = await Template.findOne({_id:id,userId:userId});
    const title = data.title;
    const content = data.content;
    const footer = data.footer;
    const imageUrl = data.imageUrl;
    res.render("layout", { title, imageUrl, content, footer }, (err, html) => {
    if (err) {
      return res.status(500).json({ error: "Failed to render layout" });
    }
    res.json({ html });
  });
  }catch(error)
  {
    console.log(error)
    res.status(500).json({error:"Internal server error"});
  }
  }

  export const editEmailLayout = async (req, res) => {
    const userId = req.auth.userId;
    const id = req.params.id;
    try{
      let data = await Template.findOne({_id:id});
      if(!data){
        data = await Template.create({
          userId:userId,
        });
        data.save();
      }
      const title = data.title;
      const content = data.content;
      const footer = data.footer;
      const imageUrl = data.imageUrl;
      res.render("layout", { title, imageUrl, content, footer }, (err, html) => {
      if (err) {
        return res.status(500).json({ error: "Failed to render layout" });
      }
      res.json({ html });
    });
    }catch(error)
    {
      console.log(error)
      res.status(500).json({error:"Internal server error"});
    }
    }

  export const renderEmailLayout = async (req, res) => {
  try{
  const userId = req.auth.userId;
  const id = req.params.id;
  const data = await Template.findOne({_id:id,userId:userId});
  const emailConfig = req.body;
  const title = emailConfig.newTitle || data.title;
  let imageUrl = emailConfig.newImageUrl;
  if(imageUrl===undefined || imageUrl==="")
  {
    imageUrl = data.imageUrl;
  }
  const content = emailConfig.newContent || data.content;
  const footer = emailConfig.newFooter || data.footer;
  res.render("layout", { title, imageUrl, content, footer }, (err, html) => {
    if (err) {
      return res.status(500).json({ error: "Failed to render layout" });
    }
    res.json({ html });
  });
  }catch(error)
  {
    console.log(error)
    res.status(500).json({error:"Internal server error"});
  }
}

export const uploadImage = async (req, res) => {
  const userId = req.auth.userId;
  const id = req.params.id;
  try{
    let userEmailLayout = await Template.findOne({_id:id, userId:userId});
    if(!userEmailLayout){
      userEmailLayout = await Template.create({
        userId:userId,
      });
      userEmailLayout.save();
      await User.findOneAndUpdate({userId:userId},{$push:{templates:data._id}});
    }
    const imageUrl = await uploadFile(req.file.path);
    const file = imageUrl;
    const update = await Template.updateOne({_id:id,userId:userId},{$set:{imageUrl:`${file}`}});
    if(!update) throw new Error("Invalid Input");

    const data = await Template.findOne({_id:id});

    const title = data.title || req.body.newTitle;
    const content = data.content || req.body.newContent;
    const footer = data.footer || req.body.newFooter;

    res.render("layout", { title, imageUrl, content, footer }, (err, html) => {
      if (err) {
        return res.status(500).json({ error: "Failed to render layout" });
      }
      res.json({ html, imageUrl });
    });
    // res.json({ imageUrl });
  }catch(error)
  {
    res.status(500).json("Failed to update.");
  }
};

export const uploadEmailConfig = async (req, res) => {
  const userId = req.auth.userId;
  const id = req.params.id;
try{
  let userEmailLayout = await Template.findOne({_id:id, userId:userId});
  const emailConfig = req.body;
  const title = emailConfig.newTitle || userEmailLayout.title;
  const imageUrl = emailConfig.newImageUrl || userEmailLayout.imageUrl;
  const content = emailConfig.newContent || userEmailLayout.content;
  const footer = emailConfig.newFooter || userEmailLayout.footer;
  if(!userEmailLayout){
    userEmailLayout = await Template.create({
      userId:userId,  
      title:title,
      imageUrl:imageUrl,
      content:content,
      footer:footer
    });
    userEmailLayout.save();
    await User.findOneAndUpdate({userId:userId},{$push:{templates:data._id}});
  }
  await Template.findOneAndUpdate({_id:id, userId:userId},{$set:{title:title,imageUrl:imageUrl,content:content,footer:footer}});
  res.render("layout", { title, imageUrl, content, footer }, (err, html) => {
    if (err) {
      return res.status(500).json({ error: "Failed to render layout" });
    }
    res.json({ html });
  });
}catch(error)
{
  res.status(500).json({error:"Internal server error"});
}
}

export const downloadTemplate = async (req, res) => {
  try{
    const templatePath = path.join(__dirname, "../views/layout.ejs");
    const id = req.params.id;
    const userId = req.auth.userId;
    const data = await Template.findOne({_id:id,userId:userId});
    const templateData = {
      title: data.title,
      imageUrl: data.imageUrl,
      content: data.content,
      footer: data.footer,
    };
    const renderedHTML = await ejs.renderFile(templatePath, templateData);
    const outputFilePath = path.join(__dirname, "../temp/emailTemplate.html");
    fs.writeFileSync(outputFilePath, renderedHTML);

    // Send the file as a downloadable response
    res.download(outputFilePath, "emailTemplate.html", (err) => {
      if (err) {
        console.error("Error while downloading the file:", err);
        res.status(500).send("An error occurred while downloading the file.");
      }
      fs.unlinkSync(outputFilePath);
    });
  } catch (error) {
    console.error("Error while generating the email template:", error);
    res.status(500).send("An error occurred while generating the email template.");
  }
  // const emailConfig = req.body;
  // const filePath = path.join(__dirname, "views/layout.ejs");
}