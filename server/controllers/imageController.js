import userModel from "../models/userModel.js";
import FormData from "form-data";
import axios from "axios";

export const generateImage = async (req, res) => {
    try {
        const { userId, prompt } = req.body;
        const user = await userModel.findById(userId);
        if (!user || !prompt) {
            return res.status(404).json({ success: false, message: "details not found" });
        }

        if (user.creditBalance === 0 || userModel.creditBalance < 0) {
            return res.status(404).json({ success: false, message: "Credit balance is zero", creditBalance: user.creditBalance });
        }

        const formData = new FormData();
        formData.append("prompt", prompt);
        
        const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API
              },
              responseType: 'arraybuffer'
        })

        const base64Image = Buffer.from(data, 'binary').toString('base64');
        const resultImage = `data:image/png;base64,${base64Image}`;

        await userModel.findByIdAndUpdate(userId, {
            creditBalance: user.creditBalance - 1
        });
        return res.status(200).json({ success: true, message: "Image generated successfully",  resultImage });
            
    }
     catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}