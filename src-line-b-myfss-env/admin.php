<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
 
    <title>DEMO myRouting Admin</title>
 
    <link href="https://cdn.jsdelivr.net/npm/halfmoon@2.0.1/css/halfmoon.min.css" rel="stylesheet" integrity="sha256-SsJizWSIG9JT9Qxbiy8xnYJfjCAkhEQ0hihxRn7jt2M=" crossorigin="anonymous">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
</head>
<body>

    <nav class="navbar navbar-expand-lg p-3 border border-0 ms-3" style="background-color: var(--bs-content-bg); border-bottom: var(--bs-border-width) solid var(--bs-content-border-color);">
        <div class="w-100 d-flex align-items-center" style="height: 3.5rem;">
            <div class="d-flex justify-content-between collapse navbar-collapse" id="navbar-collapse-1">
                <div>
                    <a class="navbar-brand" href="index.php">
                        <img src="img/USAF_LOGO.svg" alt="Logo" height="43rem" class="d-inline-block align-text-top">
                    </a>
                    <a class="navbar-brand" href="index.php">
                        <img src="img/USSF_LOGO.png" alt="Logo" height="43rem" class="d-inline-block align-text-top">
                    </a>
                </div>
                <div>
                    <form role="search" class="d-flex align-items-center">
                        <input class="form-control me-2" type="search" placeholder="Search Knowledge Articles" aria-label="Search" style="width: 20rem">
                    </form>
                </div>
                <div>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-collapse-1" aria-controls="navbar-collapse-1" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                
                    <div class="d-inline-flex align-text-top">

                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">My Apps</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Helpful Links</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Ask A Question</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle material-symbols-outlined" style="font-size: 1rem;" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">description</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <a class="navbar-brand" href="#">
                        <img src="img/USER.svg" alt="Logo" height="43rem" class="d-inline-block align-text-top" >
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <div class="container-fluid p-0" style="width: 79%;">

        <div class="w-100 border-bottom">
            <div class="d-flex justify-content-between align-items-end">
                <h3 class="pb-2">myRouting Admin Dashboard</h3>
                <div class="align-text-bottom">
                    <button type="button" class="btn btn-secondary rounded-0 me-2 mb-2" data-bs-toggle="modal" data-bs-target="#add-routing-modal" onclick="app.views.updateViewAddPacketModal();"><span class="material-symbols-outlined align-text-bottom fs-5 pe-1">add</span><span class="align-text-center">Add Packet</span></button>
                    <button type="button" class="btn btn-secondary rounded-0 mb-2"><span class="material-symbols-outlined align-text-bottom fs-5 pe-1">output_circle</span><span class="align-text-center">Admin Report</span></button>
                </div>
            </div>
        </div>

        <div class="pt-4 d-flex align-items-center">
            <img src="img/USER.svg" alt="Logo" height="80rem" class="d-inline-block align-text-top" >
            <h6 class="d-inline-block align-text-top ps-3">Welcome, Maj JANE DOE</h6>
        </div>

        <div class="w-100 pt-3">
            <h3 class="pb-2">Pending Action<span class="material-symbols-outlined ps-2 align-text-center">help</span></h3>
            <div class="border p-3 row" id="element_table_pending">
                <span>Loading...</span>
            </div>
        </div>

        <div class="w-100 pt-3">
            <h3 class="pb-2">Submitted to AFPC<span class="material-symbols-outlined ps-2 align-text-center">help</span></h3>
            <div class="border p-3 row" id="element_table_afpc">
                <span>Loading...</span>
            </div>
        </div>

        <div class="w-100 pt-3">
            <h3 class="pb-2">Awaiting Signature<span class="material-symbols-outlined ps-2 align-text-center">help</span></h3>
            <div class="border p-3 row" id="element_table_signature">
                <span>Loading...</span>
            </div>
        </div>

        <div class="w-100 pt-3">
            <h3 class="pb-2">Recently Completed<span class="material-symbols-outlined ps-2 align-text-center">help</span></h3>
            <div class="border p-3 row" id="element_table_completed">
                <span>Loading...</span>
            </div>
        </div>

    <div class="w-100 pt-3 border-bottom" style="height: 4rem;"></div>

    <div class="modal fade" id="add-routing-modal" tabindex="-1" aria-hidden="true">

        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">

            <div class="modal-content">

                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modal-title-6">Add Packet</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <form>
                        <h5>Search Members</h5>
                        <p>Use one or more fields to search for the subject of this packet.</p>

                        <div class="input-group my-3">
                            <div class="form-floating">
                                <select class="form-select" id="add-packet-modal-select-rank" aria-label="Select rank" disabled>
                                    <option value="E-1">AB</option>
                                    <option value="E-2">Amn</option>
                                    <option value="E-3">A1C</option>
                                    <option value="E-4">SrA</option>
                                    <option value="E-5">SSgt</option>
                                    <option value="E-6">TSgt</option>
                                    <option value="E-7">MSgt</option>
                                    <option value="E-8">SMSgt</option>
                                    <option value="E-9">CMSgt</option>
                                    <option disabled></option>
                                    <option value="O-1">2Lt</option>
                                    <option value="O-2">1Lt</option>
                                    <option value="O-3">Capt</option>
                                    <option value="O-4">Maj</option>
                                    <option value="O-5">Lt Col</option>
                                    <option value="O-6">Col</option>
                                    <option value="O-7">Brig Gen</option>
                                    <option value="O-8">Maj Gen</option>
                                    <option value="O-9">Lt Gen</option>
                                    <option value="O-10">Gen</option>
                                    <option disabled></option>
                                    <option selected value="ALL">All</option>
                                    <option value="CIV">Civ</option>
                                    <option value="OTH">Other</option>
                                </select>
                                <label for="select-rank">Rank</label>
                            </div>

                            <span class="input-group-text"></span>

                            <div class="form-floating">
                                <input type="text" class="form-control" placeholder="First Name" id="add-packet-modal-first-name" aria-label="First Name" aria-describedby="add-on-1" disabled>
                                <label for="first-name">First Name</label>
                            </div>

                            <span class="input-group-text"></span>

                            <div class="form-floating">
                                <input type="text" class="form-control" placeholder="Last Name" id="add-packet-modal-last-name" aria-label="Last Name" aria-describedby="add-on-1" disabled>
                                <label for="last-name">Last Name</label>
                            </div>

                            <span class="input-group-text"></span>

                            <div class="form-floating">
                                <input type="text" class="form-control" placeholder="Email" id="add-packet-modal-email" aria-label="Email" aria-describedby="add-on-1" disabled>
                                <label for="email">Email</label>
                            </div>
                        </div>

                        <div class="border-bottom my-3"></div>

                        <div id="add-packet-modal-member-table"></div>


                    </form>

                    <button type="button" class="btn btn-primary ms-auto float-end" data-bs-toggle="modal" data-bs-target="#add-routing-page2-modal">Next</button>

                </div>

            </div>
        </div>
    </div>

    <div class="modal fade" id="add-routing-page2-modal" tabindex="-1" aria-hidden="true">

        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">

            <div class="modal-content">

                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modal-title-7">Add Packet</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">

                    <form>

                        <h5>Routing Settings</h5>
                        <p>Select the appropriate options to route your document.</p>

                        <h6>Select Type</h6>

                        <div class="form-check">
                            <input class="form-check-input" type="radio" value="" name="rg2" id="r1d">
                            <label class="form-check-label" for="r1d">
                                Memo for Record
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" value="" name="rg2" id="r1c">
                            <label class="form-check-label" for="r1c">
                                DEROS Extension
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" value="" name="rg2" id="r1b">
                            <label class="form-check-label" for="r1b">
                                Command Sponsorship
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" value="" name="rg2" id="r1a">
                            <label class="form-check-label" for="r1a">
                                Training Report
                            </label>
                        </div>

                        <div class="input-group">
                            <div class="input-group-text rounded-start-circle">
                                <input type="radio" class="form-check-input mt-0" name="rg2" value="" aria-label="Radio button for following input">
                            </div>
                            <input type="text" class="form-control" placeholder="Other" aria-label="Input with radio button">
                        </div>

                        <div class="border-bottom my-3"></div>

                        <h6>Choose Recipient</h6>

                        <div class="form-check">
                            <input class="form-check-input" type="radio" value="" name="rg3" id="r2a">
                            <label class="form-check-label" for="r2a">
                                Rater
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" value="" name="rg3" id="r2b">
                            <label class="form-check-label" for="r2b">
                                CSS
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" value="" name="rg3" id="r2c">
                            <label class="form-check-label" for="r2c">
                                Commander
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" value="" name="rg3" id="r2d">
                            <label class="form-check-label" for="r2d">
                                MPF
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" value="" name="rg3" id="r2e">
                            <label class="form-check-label" for="r2e">
                                AFPC
                            </label>
                        </div>
                        <div class="input-group">
                            <div class="input-group-text rounded-start-circle">
                                <input type="radio" class="form-check-input mt-0" name="rg3" value="" aria-label="Radio button for following input">
                            </div>
                            <input type="text" class="form-control" placeholder="Other" aria-label="Input with radio button">
                        </div>

                        <div class="border-bottom my-3"></div>

                        <h6>Summary of Request</h6>

                        <div class="form-floating">
                            <textarea class="form-control" placeholder="Summary" id="example-textarea-2" style="height: 80px;"></textarea>
                            <label for="example-textarea-2">Summary</label>
                        </div>

                        <div class="border-bottom my-3"></div>

                        <h6>Add Documents</h6>

                        <div>
                            <div class="input-group">
                                <input type="file" class="form-control" id="example-file-input-1" aria-label="Attach resume">
                                <label class="input-group-text" for="example-file-input-1">Upload</label>
                            </div>
                            <div class="form-text">Include primary and supporting documents in your packet.</div>
                        </div>

                        <button type="submit" class="btn btn-primary ms-auto float-end">Submit Packet</button>

                    </form>



                </div>

            </div>
        </div>
    </div>

    <div class="modal fade" id="view-packet-modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
            <div class="modal-content" id="view-packet-modal-content">
                Loading...
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>

    <?php
    $di = new RecursiveDirectoryIterator('js');

    foreach (new RecursiveIteratorIterator($di) as $filename => $file) {
        if(!is_dir($filename)) {
            if(!str_contains($filename, '.DS_Store')) {
                echo '<script src="' . $filename . '"></script>' . PHP_EOL;
            }
        }
    }

    echo '<script>let app = new MyRouting();app.setSuperuser();</script>';
    ?>

</body>
</html>