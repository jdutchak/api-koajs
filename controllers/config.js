/**
 * Config Variables
 **/

module.exports = {
	AWS_ACCESS_KEY_ID					: process.env.AWS_ACCESS_KEY_ID,
	AWS_SECRET_ACCESS_KEY			: process.env.AWS_SECRET_ACCESS_KEY,
	AWS_REGION								: process.env.AWS_REGION,
	ENV               				: process.env.ENV ? process.env.ENV : 'DEV',
	JWT_SECRET								: process.env.JWT_SECRET,
	JWT_ALGORITHM							: process.env.JWT_ALGORITHM,
	JWT_TOKEN_EXPIRY					: process.env.JWT_TOKEN_EXPIRY,
	SMTP_DOMAIN								: process.env.SMTP_DOMAIN,
	SMTP_PORT									: process.env.SMTP_PORT,
	SMTP_USER									: process.env.SMTP_USER,
	SMTP_PASSWORD							: process.env.SMTP_PASSWORD,
	SMTP_FROM_EMAIL_ADDRESS		: process.env.SMTP_FROM_EMAIL_ADDRESS,
	ORIGIN_ACCESS             : process.env.ORIGIN_ACCESS,
	PORT											: process.env.PORT,
};
