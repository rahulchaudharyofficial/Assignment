# Project Overview

John is an operations manager. He wants to ensure product availability information is populated on
an order by the service rep before the service rep can progress the order from the New stage to the
Fulfillment stage. John wants to capture the warehouse manager’s name who confirmed available
inventory and whether each of the products ordered is in inventory or backordered. Later, when John
views the Order, he wants to see backordered scenarios indicated with red highlights on the order
screen.

## Key Deliverable & Tasks

- Operation Manager should be able to

  - See warehouse manager's details who confirmed inventory
  - See if product is available in inventory or backordered
  - See at order record screen with red highlight if order is back ordered

- Warehouse Manager should be able to

  - Specify product inventory detail (Available / Back order) but its not clear at what stage or where it is supposed to happen for example at order level or at product level from warehouse management perspective

- Sales Rep should be able to
  - See on order screen if product is inventory or back order
  - should be able to change order stage & provide availability

  
  ### Tasks
    Solution are detailed for each task

    | Task          | Expectation   |
    | ------------- | ------------- |
    | Task 1        |  Deliverable: One minute end-user demo video of the journey.           <br /> Deliverable: One minute technical demo video of components built.  <br />Deliverable: One minute video walkthrough of your written test cases in Excel. |
    | Task 2        |   Deliverable: One minute end-user demo video of the journey.            <br /> Deliverable: One minute technical demo video of components built. <br /> Deliverable: One minute video walkthrough of your written test cases in Excel. |
    | Task 3        |  Provide a video answer to one technical troubleshooting question. <br />  |

Final Question :  take 2 minutes to answer on video <br /> Please describe the steps you would take to create and analyze a debug log in Salesforce. In your
explanation, please cover the following points:
1. How to enable and set up debug logging for a user or a specific event.
2. The specific steps you would follow to generate the debug log.
3. Key elements and information you would look for in the debug log to identify and troubleshoot issues.
4. An example scenario where you used a debug log to solve a problem in Salesforce. Please be detailed in your explanation and feel free to use specific terminology and concepts related to Salesforce debugging.

## Assumptions

    -   Warehouse manager provide inventory specific input at each product level

    -   Assuming that an order may have more than one product in it

    -   There is a process in place to receive / populate inventory details in system along with warehouse manager details (reference)

    -   Assuming if order is in inventory sales rep should be able to move it to fullfilment stage else not (if backorder)

    -   Assuming order is available in new stage for Sales Rep to review and decide if move it for next stage or not

    -   Assuming that on each order screen itself it is expected to understand order health


###
### High Level Workflow

![Workflow](docs/images/flow.png)

### Demo

![Snapshot](docs/images/demo.png)
