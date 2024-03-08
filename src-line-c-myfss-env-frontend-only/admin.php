<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>myRouting - CSS Admin Dashboard</title>
    <link href="css/halfmoon/halfmoon.min.css" rel="stylesheet">
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
            <h3 class="pb-2">myRouting - CSS Admin Dashboard</h3>
            <div class="align-text-bottom">
                <button type="button" class="btn btn-secondary rounded-0 me-2 mb-2" data-bs-toggle="modal" data-bs-target="#add-routing-modal" onclick="app.views.updateViewAddPacketModal();"><span class="material-symbols-outlined align-text-bottom fs-5 pe-1">add</span><span class="align-text-center">Add Packet</span></button>
                <button type="button" class="btn btn-secondary rounded-0 mb-2" disabled><span class="material-symbols-outlined align-text-bottom fs-5 pe-1">output_circle</span><span class="align-text-center">Admin Report</span></button>
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

            <table class="table table-striped">
                <thead>
                <tr>
                    <th scope="col" style="width: 20%">Recipient</th>
                    <th scope="col" style="width: 20%">Type</th>
                    <th scope="col" style="width: 20%">Suspense</th>
                    <th scope="col" style="width: 20%">Status</th>
                    <th scope="col" style="width: 20%">Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>SSgt Rogers, Eric</td>
                    <td>Signature - DEROS Curtailment</td>
                    <td>23 Apr 2024</td>
                    <td>Awaiting review by CSS</td>
                    <td>
                        <button type="button" class="btn btn-secondary rounded-0 me-2" data-bs-toggle="modal" data-bs-target="#view-packet-modal">View</button>
                        <button type="button" class="btn btn-secondary rounded-0" disabled>Reassign</button>
                    </td>
                </tr>
                <tr>
                    <td>1Lt Richards, Kyle</td>
                    <td>Signature - Memo For Record</td>
                    <td>N/A</td>
                    <td>Awaiting decision by CSS</td>
                    <td>
                        <button type="button" class="btn btn-secondary rounded-0 me-2" data-bs-toggle="modal" data-bs-target="#view-packet-modal">View</button>
                        <button type="button" class="btn btn-secondary rounded-0" disabled>Reassign</button>
                    </td>
                </tr>
                </tbody>
            </table>

        </div>
    </div>
    <div class="w-100 pt-3">
        <h3 class="pb-2">Submitted to AFPC<span class="material-symbols-outlined ps-2 align-text-center">help</span></h3>
        <div class="border p-3 row" id="element_table_afpc">

            <table class="table table-striped">
                <thead>
                <tr>
                    <th scope="col" style="width: 20%">Recipient</th>
                    <th scope="col" style="width: 20%">Type</th>
                    <th scope="col" style="width: 20%">Suspense</th>
                    <th scope="col" style="width: 20%">Status</th>
                    <th scope="col" style="width: 20%">Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>MSgt Smith, Melissa</td>
                    <td>Signature - DEROS Extension</td>
                    <td>3 May 2024</td>
                    <td>Awaiting decision by AFPC</td>
                    <td>
                        <button type="button" class="btn btn-secondary rounded-0 me-2" data-bs-toggle="modal" data-bs-target="#view-packet-modal">View</button>
                        <button type="button" class="btn btn-secondary rounded-0" disabled>Reassign</button>
                    </td>
                </tr>
                </tbody>
            </table>

        </div>
    </div>
    <div class="w-100 pt-3">
        <h3 class="pb-2">Awaiting Signature<span class="material-symbols-outlined ps-2 align-text-center">help</span></h3>
        <div class="border p-3 row" id="element_table_signature">

            <table class="table table-striped">
                <thead>
                <tr>
                    <th scope="col" style="width: 20%">Recipient</th>
                    <th scope="col" style="width: 20%">Type</th>
                    <th scope="col" style="width: 20%">Suspense</th>
                    <th scope="col" style="width: 20%">Status</th>
                    <th scope="col" style="width: 20%">Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1Lt Richards, Kyle</td>
                    <td>Signature - Memo For Record</td>
                    <td>N/A</td>
                    <td>Awaiting decision by CSS</td>
                    <td>
                        <button type="button" class="btn btn-secondary rounded-0 me-2" data-bs-toggle="modal" data-bs-target="#view-packet-modal">View</button>
                        <button type="button" class="btn btn-secondary rounded-0" disabled>Reassign</button>
                    </td>
                </tr>
                </tbody>
            </table>

        </div>
    </div>
    <div class="w-100 pt-3">
        <h3 class="pb-2">Recently Completed<span class="material-symbols-outlined ps-2 align-text-center">help</span></h3>
        <div class="border p-3 row" id="element_table_completed">

            <table class="table table-striped">
                <thead>
                <tr>
                    <th scope="col" style="width: 20%">Recipient</th>
                    <th scope="col" style="width: 20%">Type</th>
                    <th scope="col" style="width: 20%">Date Archived</th>
                    <th scope="col" style="width: 20%">Status</th>
                    <th scope="col" style="width: 20%">Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>SSgt Rogers, Eric</td>
                    <td>Signature - Command Sponsorship</td>
                    <td>14 Jan 2024</td>
                    <td>Archived</td>
                    <td>
                        <button type="button" class="btn btn-secondary rounded-0 me-2" data-bs-toggle="modal" data-bs-target="#view-packet-modal">View</button>
                        <button type="button" class="btn btn-secondary rounded-0" disabled>Reassign</button>
                    </td>
                </tr>
                </tbody>
            </table>

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
                                <select class="form-select" id="add-packet-modal-select-rank" aria-label="Select rank">
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
                                <input type="text" class="form-control" placeholder="First Name" id="add-packet-modal-first-name" aria-label="First Name" aria-describedby="add-on-1">
                                <label for="first-name">First Name</label>
                            </div>
                            <span class="input-group-text"></span>
                            <div class="form-floating">
                                <input type="text" class="form-control" placeholder="Last Name" id="add-packet-modal-last-name" aria-label="Last Name" aria-describedby="add-on-1">
                                <label for="last-name">Last Name</label>
                            </div>
                            <span class="input-group-text"></span>
                            <div class="form-floating">
                                <input type="text" class="form-control" placeholder="Email" id="add-packet-modal-email" aria-label="Email" aria-describedby="add-on-1">
                                <label for="email">Email</label>
                            </div>
                        </div>
                        <div class="border-bottom my-3"></div>
                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">Select</th>
                                <th scope="col">Rank</th>
                                <th scope="col">Name</th>
                                <th scope="col">Organization</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">
                                    <div class="form-check">
                                        <label for="rr1"></label>
                                        <input class="form-check-input" type="radio" value="' + e.uid + '" name="gg1" id="rr1">
                                    </div>
                                </th>
                                <td>x</td>
                                <td>x, x</td>
                                <td>x</td>
                            </tr>
                            </tbody>
                        </table>
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
                                Supervisor
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" value="" name="rg3" id="r2b">
                            <label class="form-check-label" for="r2b">
                                CSS
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" value="" name="rg3" id="r2d">
                            <label class="form-check-label" for="r2d">
                                Finance
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
                            <label for="example-textarea-2">TODO: Add Staff Summary Sheet Template</label>
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
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">

                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modal-title-1">Packet: Command Sponsorship, Kelsey Rogers</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-4">
                            <div class="card w-auto">
                                <div class="card-body bg-primary-subtle">

                                    <h5>Packet # 12345</h5>
                                    <p class="fst-italic">Created on 2 Sep 24 @ 14:23:06 GMT+1<br>by Rogers, Eric M SSgt USAF USA</p>

                                    <div class="form-floating my-2">
                                        <input class="form-control" placeholder="Enter a name" value="Command Sponsorship, Kelsey Rogers" id="a1">
                                        <label for="a1">Packet Name</label>
                                    </div>
                                    <div class="input-group my-2">
                                        <div class="form-floating">
                                            <input readonly class="form-control" placeholder="Select an organization" value="0001 Air Control Sq" id="c3">
                                            <label for="c3">Organization</label>
                                        </div>
                                        <button type="button" class="btn btn-outline-secondary" id="button-add-on-1">Choose</button>
                                    </div>
                                    <div class="form-floating my-2">
                                        <input class="form-control" placeholder="Enter a type" value="Command Sponsorship" id="g4">
                                        <label for="g4">Type</label>
                                    </div>
                                    <div class="form-floating my-2">
                                        <input class="form-control" placeholder="Enter a member" value="Rogers, Eric M SSgt USAF USA" id="v5">
                                        <label for="v5">Subject (Member)</label>
                                        <div class="btn-group btn-group-sm m-2" role="group">
                                            <button type="button" class="btn btn-dark rounded-start-5" disabled>ER</button>
                                            <button type="button" class="btn btn-light" disabled>Rogers, Eric M SSgt USAF USA</button>
                                            <button type="button" class="btn btn-light rounded-end-5">X</button>
                                        </div>
                                    </div>
                                    <div class="form-floating my-2">
                                        <input class="form-control" placeholder="Enter an observer" value="" id="a3">
                                        <label for="a3">Observers (Members)</label>
                                    </div>
                                    <div class="form-floating my-2">
                                        <input class="form-control" placeholder="Enter a suspense" value="23 Aug 2024" id="a4">
                                        <label for="a4">Suspense</label>
                                    </div>

                                </div>
                            </div>

                            <div class="card w-auto mt-4">
                                <div class="card-body bg-warning-subtle">
                                    <h5>Packet Files</h5>

                                    <div class="mt-3">
                                        <label class="form-label" for="efi1">Upload File</label>
                                        <div class="input-group input-group-sm">
                                            <input type="file" class="form-control" id="efi1">
                                            <label class="input-group-text" for="es1">Type</label>
                                            <select class="form-select" id="es1">
                                                <option selected disabled>Choose option</option>
                                                <option value="signature">Signature File</option>
                                                <option value="support">Support File</option>
                                            </select>
                                            <label class="input-group-text" for="efi1">Upload</label>
                                        </div>
                                        <div class="form-text">Select a new file to upload.</div>
                                    </div>

                                    <div class="my-3">
                                        <div class="my-1">
                                            <h6 class="fst-italic text-muted d-inline">Signature Files</h6>
                                        </div>
                                        <div class="btn-group btn-group-sm" role="group">
                                            <button type="button" class="btn btn-secondary rounded-start-4"><span class="ps-2 font-monospace fst-italic">Rogers_Command_Sponsorship_-_Edit_6.pdf</span></button>
                                            <button type="button" class="btn btn-light rounded-end-4"><span class="pe-1">X</span></button>
                                        </div>
                                    </div>
                                    <div class="my-3">
                                        <div class="my-1">
                                            <h6 class="fst-italic text-muted d-inline">Support Files</h6>
                                        </div>
                                        <div class="btn-group btn-group-sm" role="group">
                                            <button type="button" class="btn btn-secondary rounded-start-4"><span class="ps-2 font-monospace fst-italic">Some_Regulation.pdf</span></button>
                                            <button type="button" class="btn btn-light rounded-end-4"><span class="pe-1">X</span></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-8">
                            <div class="mb-2 d-flex justify-content-end">
                                <button type="button" class="btn btn-sm btn-primary mx-1">Add New Phase</button>
                                <button type="button" class="btn btn-sm btn-light mx-1">Add Comment (Public)</button>
                                <button type="button" class="btn btn-sm btn-dark mx-1">Send Push Note (Private)</button>
                            </div>

                            <div class="card w-auto">
                                <div class="card-body bg-dark">
                                    <h5 class="text-light">Phases</h5>
                                    <div class="card-body bg-dark-subtle">
                                        <div class="form-floating w-25 my-3">
                                            <input class="form-control" id="phase-name1" placeholder="Phase name" value="Phase 1">
                                            <label for="phase-name1">Phase Name</label>
                                        </div>
                                        <div class="form-floating w-25 my-3">
                                            <input class="form-control" id="assignee-1" placeholder="Assignee" value="McDonald, Carl G SMSgt USAF USA">
                                            <label for="assignee-1">Assignee</label>
                                        </div>
                                        <div class="form-floating w-25 my-3">
                                            <select class="form-select" id="example-select-1">
                                                <option selected disabled>Select an option</option>
                                                <option value="signature">Signature</option>
                                                <option value="approval">Approval</option>
                                                <option value="concurrence">Concurrence</option>
                                                <option value="review">Review</option>
                                            </select>
                                            <label for="example-select-1">Action Required</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save</button>
                </div>

            </div>
        </div>
    </div>
    <script src="js/bootstrap.bundle.min.js"></script>
</body>
</html>