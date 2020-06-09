CREATE TABLE [dbo].[WatchedRecipes](
    [user_id] [UNIQUEIDENTIFIER] NOT NULL,
	[recipe_id] int NOT NULL,
	[time] DATETIME NOT NULL default GETDATE(),
	PRIMARY KEY (user_id, recipe_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id)
)