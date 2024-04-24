<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ma Page Web</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        header {
            background-color: #333;
            color: #fff;
            padding: 10px 20px;
            text-align: center;
        }
        nav {
            background-color: #f2f2f2;
            padding: 10px 20px;
            text-align: center;
        }
        nav a {
            text-decoration: none;
            color: #333;
            margin: 0 10px;
        }
        nav a:hover {
            color: #fff;
            background-color: #333;
            padding: 5px 10px;
            border-radius: 5px;
        }
        .content {
            padding: 20px;
        }
    </style>
</head>
<body>
    <header>
        <h1>Web'O'Maxime</h1>
    </header>
    <div class="content">
        <h2>Bienvenue sur ma page web</h2>
        <p>Tout est encore en travaux, plusieurs projets seront disponibles à long terme.</p>
        <!-- <iframe src="./cv-livecampus-maxime-lorne.pdf" width="100%" height="600px"></iframe> -->
        <embed src="./cv-livecampus-maxime-lorne.pdf" width="100%" height="600px" />
    </div>
</body>
</html>
