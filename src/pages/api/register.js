import User  from "../../lib/model";
import connectToDb from "../../lib/utils";

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { username, email, password, passwordRepeat } = req.body;
  
      if (password !== passwordRepeat) {
        return res.status(400).json({ error: "Şifreler uyuşmuyor!" });
      }
  
      try {
        await connectToDb();
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          return res.status(400).json({ error: "Kullanıcı zaten mevcut!" });
        }
  
        const newUser = new User({
          username,
          email,
          password,
        });
        await newUser.save();
        return res.status(201).json({ success: true });
      } catch (error) {
        console.error("Kayıt hatası:", error);
        return res.status(500).json({ error: "Bir şeyler ters gitti" });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}