module.exports = {
  async afterCreate(event) {
    try {
      const { result, params } = event;
      const email = params.data.email;
      const name = params.data.name;
      const job = params.data.job;
      const title = "Developer"; //TODO: This needs to be passed through request
      return await strapi
        .plugin("email")
        .service("email")
        .send({
          from: "<mailgun@sandboxaa779ed19c6b4654adc5a91c4cc17924.mailgun.org>",
          to: [email],
          subject: `Application Receieved for ${title} Role`,
          html: `
    <div class="container">
        <div class="header">
            <img src="https://via.placeholder.com/100" alt="Company Logo">
        </div>
        <div class="content">
            <h1>Application Received</h1>
            <p>Dear ${name},</p>
            <p>Thank you for applying for the ${title} position at UK. We have received your application and our team is currently reviewing your qualifications.</p>
            <p>We appreciate your interest in joining our team and will be in touch with you soon if your profile matches our requirements for this role.</p>
            <p>In the meantime, if you have any questions or need further information, please do not hesitate to contact us at [contact email] or [phone number].</p>
            <p>Thank you once again for considering [Company Name] as your next career opportunity.</p>
            <p>Best regards,</p>
            <p>Aryan</p>
            <p>Click for Work</p>
        </div>
        <div class="footer">
            <p>&copy; [Current Year] Click For Work. All rights reserved.</p>
            <p>UK</p>
        </div>
    </div>
</body>
</html>`,
        });
    } catch (err) {
      console.log(err);
    }
  },
  async beforeUpdate(event) {
    try {
      const { where, data } = event.params;
      const { email, name, status } = data;
      const currentEntry = await strapi.entityService.findOne(
        "api::application.application",
        where.id,
        {
          fields: ["status"],
          populate: {
            job: {
              fields: ["title"],
            },
          },
        }
      );
      console.log(currentEntry);
      const title = currentEntry.job.title; //TODO: title to be get from api
      if (data.status !== currentEntry.status) {
        console.log("sent");
        return await strapi
          .plugin("email")
          .service("email")
          .send({
            from: "<mailgun@sandboxaa779ed19c6b4654adc5a91c4cc17924.mailgun.org>",
            to: [email],
            subject: `Congratulations! You Have Been Shortlisted for ${title} Position`,
            html: `<p>Dear ${name},</p>

        <p>I hope this email finds you well.</p>

        <p>We are pleased to inform you that you have been shortlisted for the <strong>${title}</strong> position at <strong>[Company Name]</strong>. After reviewing your application and considering your qualifications, we believe you could be a great fit for our team.</p>

        <p>We would like to invite you to the next stage of our recruitment process, which involves [describe the next steps, such as an interview, assessment, etc.]. Below are the details:</p>

        <p><strong>Date:</strong> [Date]</p>
        <p><strong>Time:</strong> [Time]</p>
        <p><strong>Location:</strong> [Location] / [Specify if it will be a virtual meeting and include a link if applicable]</p>
        <p><strong>Duration:</strong> [Approximate duration]</p>

        <p>Please confirm your availability for the above-mentioned date and time at your earliest convenience. If you have any questions or need to reschedule, feel free to contact me directly at <a href="mailto:[Your Email Address]">[Your Email Address]</a> or <a href="tel:[Your Phone Number]">[Your Phone Number]</a>.</p>

        <p>We look forward to the opportunity to learn more about you and discuss how your skills and experiences align with our goals at <strong>[Company Name]</strong>.</p>

        <p>Thank you for your interest in joining our team.</p>

        <p>Best regards,</p>

        <p>
          <strong>[Your Full Name]</strong><br>
          [Your Job Title]<br>
          [Company Name]<br>
          [Company Address]<br>
          <a href="mailto:[Your Email Address]">[Your Email Address]</a><br>
          <a href="tel:[Your Phone Number]">[Your Phone Number]</a>
        </p>`,
          });
      }
    } catch (error) {
      console.error(error);
    }
  },
};
