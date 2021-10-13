use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};
use std::str;

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct Component {
    pub opcode: u8,                 // last operation done on this component
    pub id: u8,                     // unique component identifier
    pub description: [u8; 64],      // component description
    pub name: [u8; 16],             // component names
    pub serial_no: [u8; 16],        // unique component serial number
    pub parent: u8,                 // parent component id of this component
    pub children: [u8; 10],         // children component ids of this componnet
    pub active: u8,                 // component recycle status. (0: recycled, others: not recycled)
}


// Declare and export the program's entrypoint
entrypoint!(process_instruction);

// Program entrypoint's implementation
pub fn process_instruction(
    program_id: &Pubkey,            // Public key of the account this program was loaded into
    accounts: &[AccountInfo],       // The component's account to operate on
    instruction_data: &[u8],        // Operations and data
) -> ProgramResult {
    msg!("Circular Economy - Solana Hackathon (NFTs to track asset lifecycle on Solana ledger)");

    // Get accounts
    let accounts_iter = &mut accounts.iter();
    let account = next_account_info(accounts_iter)?;

    // check account ownership, account must be owned by the program in order to process request
    if account.owner != program_id {
        msg!("Account does not have the correct program id");
        return Err(ProgramError::IncorrectProgramId);
    }

    let decoded_component = Component::try_from_slice(instruction_data).unwrap();
    msg!("------------------------- Received ---------------------------");
    msg!("Decoded component: {:?}", decoded_component);
    msg!("-------------------------------------------------------------");

    match decoded_component.opcode {
        100 => {  // when a component is manufactured
            msg!("Opcode: 100 <Mint component>");
            
            let mut component = Component::try_from_slice(&account.data.borrow())?;

            component.opcode = decoded_component.opcode;            
            component.id = decoded_component.id;
            component.description = decoded_component.description;
            component.name = decoded_component.name;
            component.serial_no = decoded_component.serial_no;
            component.parent = decoded_component.parent;
            component.children = decoded_component.children;
            component.active = 1;
            
            component.serialize(&mut &mut account.data.borrow_mut()[..])?;

            msg!("------------------------ Component -----------------------------");
            let des = str::from_utf8(&component.description).unwrap();
            let s_no = str::from_utf8(&component.serial_no).unwrap();
            let nme = str::from_utf8(&component.name).unwrap();
            let recycled = match component.active {
                0 => "No",
                _ =>  "Yes",
            };

            msg!("Component (ID: {}, Serial No: {}, Name: {})", component.id, s_no, nme);
            msg!("Description: {}", des);
            msg!("In circulation: {}", recycled);
            msg!("Parent component id: {}", component.parent);
            msg!("List of children component ids: {:?}", component.children);
            msg!("-------------------------------------------------------------");
        }
        
        101 => {  // when a component needs to be updated on the ledger
            msg!("Opcode: 101 <Update component>");
            
            let mut component = Component::try_from_slice(&account.data.borrow())?;

            component.opcode = decoded_component.opcode;            
            component.description = decoded_component.description;
            component.name = decoded_component.name;
            component.serial_no = decoded_component.serial_no;
            component.parent = decoded_component.parent;
            component.children = decoded_component.children;
            component.active = decoded_component.active;
            
            component.serialize(&mut &mut account.data.borrow_mut()[..])?;

            msg!("------------------------ Component -----------------------------");
            let des = str::from_utf8(&component.description).unwrap();
            let s_no = str::from_utf8(&component.serial_no).unwrap();
            let nme = str::from_utf8(&component.name).unwrap();
            let recycled = match component.active {
                0 => "No",
                _ =>  "Yes",
            };

            msg!("Component (ID: {}, Serial No: {}, Name: {})", component.id, s_no, nme);
            msg!("Description: {}", des);
            msg!("In circulation: {}", recycled);
            msg!("Parent component id: {}", component.parent);
            msg!("List of children component ids: {:?}", component.children);
            msg!("-------------------------------------------------------------");
        }

        102 => {  // when a component is used as a sub-components of a larger product during manufacture
            msg!("Opcode: 102 <Add as child>");
            
            let mut component_child = Component::try_from_slice(&account.data.borrow())?;
            let account_parent = next_account_info(accounts_iter)?;
            let mut component_parent = Component::try_from_slice(&account_parent.data.borrow())?;

            component_child.opcode = decoded_component.opcode;
            component_child.parent = component_parent.id;

            component_parent.opcode = decoded_component.opcode;
            for child_id in component_parent.children.iter_mut() {
                if *child_id == 0 {
                    *child_id = component_child.id;
                    break;
                }
            }
            
            component_child.serialize(&mut &mut account.data.borrow_mut()[..])?;
            component_parent.serialize(&mut &mut account_parent.data.borrow_mut()[..])?;

            msg!("------------------------ Component -----------------------------");
            let des = str::from_utf8(&component_parent.description).unwrap();
            let s_no = str::from_utf8(&component_parent.serial_no).unwrap();
            let nme = str::from_utf8(&component_parent.name).unwrap();
            let recycled = match component_parent.active {
                0 => "No",
                _ =>  "Yes",
            };

            msg!("Component (ID: {}, Serial No: {}, Name: {})", component_parent.id, s_no, nme);
            msg!("Description: {}", des);
            msg!("In circulation: {}", recycled);
            msg!("Parent component id: {}", component_parent.parent);
            msg!("List of children component ids: {:?}", component_parent.children);
            msg!("-------------------------------------------------------------");

            msg!("------------------------ Component -----------------------------");
            let des = str::from_utf8(&component_child.description).unwrap();
            let s_no = str::from_utf8(&component_child.serial_no).unwrap();
            let nme = str::from_utf8(&component_parent.name).unwrap();
            let recycled = match component_child.active {
                0 => "No",
                _ =>  "Yes",
            };

            msg!("Component (ID: {}, Serial No: {}, Name: {})", component_child.id, s_no, nme);
            msg!("Description: {}", des);
            msg!("In circulation: {}", recycled);
            msg!("Parent component id: {}", component_child.parent);
            msg!("List of children component ids: {:?}", component_child.children);
            msg!("-------------------------------------------------------------");
        }

        103 => {  // when a component is recycled into raw materials
            msg!("Opcode: 103 <Burn component>");
            
            let mut component = Component::try_from_slice(&account.data.borrow())?;

            component.opcode = decoded_component.opcode;            
            component.active = 0;
            // last known parent and children are preserved
            
            component.serialize(&mut &mut account.data.borrow_mut()[..])?;

            msg!("------------------------ Component -----------------------------");
            let des = str::from_utf8(&component.description).unwrap();
            let s_no = str::from_utf8(&component.serial_no).unwrap();
            let nme = str::from_utf8(&component.name).unwrap();
            let recycled = match component.active {
                0 => "No",
                _ =>  "Yes",
            };

            msg!("Component (ID: {}, Serial No: {}, Name: {})", component.id, s_no, nme);
            msg!("Description: {}", des);
            msg!("In circulation: {}", recycled);
            msg!("Parent component id: {}", component.parent);
            msg!("List of children component ids: {:?}", component.children);
            msg!("-------------------------------------------------------------");
        }

        _ => {
            msg!("Unknown opcode");
        }
    };

    Ok(())
}
