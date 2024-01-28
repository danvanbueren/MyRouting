<!doctype html>
<html lang="en" data-bs-core="modern" data-bs-theme="dark">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>MyRouting</title>

    <link href="css/halfmoon/halfmoon.min.css" rel="stylesheet">
    <link href="css/halfmoon/cores/halfmoon.cores.css" rel="stylesheet">
    <link href="css/google/materialSymbols.css" rel="stylesheet">
</head>
<body>

<nav class="navbar navbar-expand-lg" style="background-color: var(--bs-content-bg); border-bottom: var(--bs-border-width) solid var(--bs-content-border-color);">
    <div class="container">
        <a class="navbar-brand d-flex align-items-center" href="#">
            <span class="material-symbols-outlined">history_edu</span>
            <span class="ps-2">MyRouting</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-collapse-1" aria-controls="navbar-collapse-1" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbar-collapse-1">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link active" href="#">Home</a>
                </li>
            </ul>
            <button class="btn btn-primary"><span class="d-flex align-items-center"><span class="material-symbols-outlined fs-6">login</span><span class="ps-1">Log In</span></span></button>
        </div>
    </div>
</nav>

<div class="container py-1" id="root-container">
    <div class="d-flex flex-column py-4">
        <span class="align-self-center material-symbols-outlined fs-1 py-2 text-warning">warning</span>
        <h1 class="align-self-center text-warning">Unable To Load!</h1>
        <h6 class="align-self-center py-2">Please enable JavaScript in your browser's settings to use this application.</h6>
    </div>
</div>

<div class="position-absolute bottom-0 start-0 p-3">
    <div class="card" style="width: 18.75rem">
        <div class="card-header d-flex justify-content-between">
            <h6 class="card-subtitle pt-1 text-body-secondary align-self-center">WEBLOG</h6>
            <button type="button" class="btn btn-secondary btn-sm float-end align-self-center" id="weblog-hide">Hide</button>
        </div>

        <div class="card-body overflow-y-scroll" style="height: 6rem;" id="weblog-body">
            <p class="font-monospace p-0" id="weblog-content">
            </p>
        </div>
    </div>
</div>

<script src="js/bootstrap/bootstrap.bundle.min.js"></script>

<?php
// Easy way to add all <script> tags for the project's JS ...NOT FOR PRODUCTION BUILD

$dirIterator = new RecursiveDirectoryIterator("js/myrouting/autoload");
$iterator = new RecursiveIteratorIterator($dirIterator, RecursiveIteratorIterator::SELF_FIRST);

foreach ($iterator as $file) {
    if($file->getExtension() == 'js') {
        $url = $file->getPathname();
        echo '<script src="' . $url . '"></script>';
    }
}

?>

<script src="js/myrouting/init.js"></script>

</body>

</html>