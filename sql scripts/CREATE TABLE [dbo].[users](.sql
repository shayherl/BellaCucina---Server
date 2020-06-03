CREATE TABLE [dbo].[users](
	[user_id] [UNIQUEIDENTIFIER] PRIMARY KEY NOT NULL default NEWID(),
	[username] [varchar](30) NOT NULL UNIQUE,
	[firstname] [varchar](30) NOT NULL,
	[lastname] [varchar](30) NOT NULL,
	[country] [varchar](70) NOT NULL,
	[password] [varchar](300) NOT NULL,
	[email] [varchar](30) NOT NULL,
	[profilePic] [varchar](max) NOT NULL
)

