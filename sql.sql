USE [master]
GO
/****** Object:  Database [PokeHexDatabase]    Script Date: 26/02/2025 19:19:13 ******/
CREATE DATABASE [PokeHexDatabase]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'PokeHexDatabase', FILENAME = N'/var/opt/mssql/data/PokeHexDatabase.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'PokeHexDatabase_log', FILENAME = N'/var/opt/mssql/data/PokeHexDatabase_log.ldf' , SIZE = 73728KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [PokeHexDatabase] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [PokeHexDatabase].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [PokeHexDatabase] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [PokeHexDatabase] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [PokeHexDatabase] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [PokeHexDatabase] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [PokeHexDatabase] SET ARITHABORT OFF 
GO
ALTER DATABASE [PokeHexDatabase] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [PokeHexDatabase] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [PokeHexDatabase] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [PokeHexDatabase] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [PokeHexDatabase] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [PokeHexDatabase] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [PokeHexDatabase] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [PokeHexDatabase] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [PokeHexDatabase] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [PokeHexDatabase] SET  ENABLE_BROKER 
GO
ALTER DATABASE [PokeHexDatabase] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [PokeHexDatabase] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [PokeHexDatabase] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [PokeHexDatabase] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [PokeHexDatabase] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [PokeHexDatabase] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [PokeHexDatabase] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [PokeHexDatabase] SET RECOVERY FULL 
GO
ALTER DATABASE [PokeHexDatabase] SET  MULTI_USER 
GO
ALTER DATABASE [PokeHexDatabase] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [PokeHexDatabase] SET DB_CHAINING OFF 
GO
ALTER DATABASE [PokeHexDatabase] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [PokeHexDatabase] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [PokeHexDatabase] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [PokeHexDatabase] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'PokeHexDatabase', N'ON'
GO
ALTER DATABASE [PokeHexDatabase] SET QUERY_STORE = ON
GO
ALTER DATABASE [PokeHexDatabase] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [PokeHexDatabase]
GO
/****** Object:  Table [dbo].[Games]    Script Date: 26/02/2025 19:19:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Games](
	[id] [uniqueidentifier] NOT NULL,
	[name] [nvarchar](50) NOT NULL,
	[user_id] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Moves]    Script Date: 26/02/2025 19:19:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Moves](
	[name] [varchar](20) NOT NULL,
	[category] [varchar](20) NOT NULL,
	[type] [varchar](20) NOT NULL,
	[power] [numeric](3, 0) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pokemon]    Script Date: 26/02/2025 19:19:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pokemon](
	[name] [varchar](15) NOT NULL,
	[generation] [numeric](2, 0) NOT NULL,
	[category] [varchar](25) NOT NULL,
	[ps] [numeric](3, 0) NOT NULL,
	[attack] [numeric](3, 0) NOT NULL,
	[defense] [numeric](3, 0) NOT NULL,
	[spAttack] [numeric](3, 0) NOT NULL,
	[spDefense] [numeric](3, 0) NOT NULL,
	[speed] [numeric](3, 0) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PokemonGame]    Script Date: 26/02/2025 19:19:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PokemonGame](
	[id] [uniqueidentifier] NOT NULL,
	[pokemon_id] [varchar](15) NULL,
	[game_id] [uniqueidentifier] NULL,
	[box_number] [numeric](18, 0) NOT NULL,
	[location_in_box] [numeric](18, 0) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PokemonMoves]    Script Date: 26/02/2025 19:19:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PokemonMoves](
	[id] [uniqueidentifier] NOT NULL,
	[pokemon_id] [uniqueidentifier] NOT NULL,
	[move_id] [varchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 26/02/2025 19:19:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[name] [varchar](50) NOT NULL,
	[email] [varchar](50) NOT NULL,
	[type] [varchar](50) NOT NULL,
	[password] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Games] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[PokemonGame] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[PokemonMoves] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Games]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([email])
GO
ALTER TABLE [dbo].[PokemonGame]  WITH CHECK ADD FOREIGN KEY([game_id])
REFERENCES [dbo].[Games] ([id])
GO
ALTER TABLE [dbo].[PokemonGame]  WITH CHECK ADD FOREIGN KEY([pokemon_id])
REFERENCES [dbo].[Pokemon] ([name])
GO
ALTER TABLE [dbo].[PokemonMoves]  WITH CHECK ADD FOREIGN KEY([move_id])
REFERENCES [dbo].[Moves] ([name])
GO
ALTER TABLE [dbo].[PokemonMoves]  WITH CHECK ADD FOREIGN KEY([pokemon_id])
REFERENCES [dbo].[PokemonGame] ([id])
GO
USE [master]
GO
ALTER DATABASE [PokeHexDatabase] SET  READ_WRITE 
GO
